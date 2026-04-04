import { Peer, DataConnection } from 'peerjs';
import { nanoid } from 'nanoid';
import { Player, AvatarType } from '../types/game';
import { generateLevels } from '../data/levelGenerator';
import { Level } from '../data/gameData';

export type GameState = {
  roomId: string;
  players: Player[];
  currentTurnIndex: number;
  status: 'waiting' | 'starting' | 'playing' | 'ended' | 'finished';
  turnTimeLeft: number;
  mode: 'finance' | 'sustainability';
  globalModal: 'switch' | null;
  auction: {
    active: boolean;
    rolls: Record<string, number>;
    turnIndex: number;
  };
  levels: Level[];
};

export type Message =
  | { type: 'JOIN_REQUEST'; profile: Player }
  | { type: 'STATE_UPDATE'; state: GameState }
  | { type: 'START_GAME' }
  | { type: 'ACTION_DICE_ROLL'; steps: number }
  | { type: 'ACTION_QUIZ_RESULT'; reward: number; penalty: number; success: boolean }
  | { type: 'ACTION_COST_ANALYSIS_RESULT'; reward: number; penalty: number; success: boolean }
  | { type: 'ACTION_VALUE_CHAIN_RESULT'; reward: number; penalty: number; success: boolean }
  | { type: 'ACTION_TAX_PAY'; amount: number }
  | { type: 'ACTION_TAX_COLLECT' }
  | { type: 'ACTION_INVEST'; result: number; amount: number; stake: number }
  | { type: 'ACTION_INSURANCE_BUY'; cost: number }
  | { type: 'ACTION_THEME_SWITCH'; mode: 'finance' | 'sustainability' }
  | { type: 'ACTION_AUCTION_START' }
  | { type: 'ACTION_AUCTION_ROLL'; roll: number }
  | { type: 'ACTION_JAIL_WAIT' }
  | { type: 'ACTION_TAX_EXEMPT'; turns: number; playerId?: string }
  | { type: 'ACTION_TAX_COLLECT_FROM_PLAYERS'; targets: string[]; amountPerPlayer: number }
  | { type: 'ACTION_INTERACTION_START' }
  | { type: 'ACTION_INTERACTION_END' }
  | { type: 'ACTION_AUCTION_END' }
  | { type: 'ACTION_JAIL_SKIP' }
  | { type: 'ACTION_JAIL_PAY'; fine: number }
  | { type: 'UPDATE_LEVELS'; levels: Level[] };

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const isLocalhost = 
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' || 
  window.location.hostname.startsWith('192.168.') || 
  window.location.hostname.startsWith('10.');

class MultiplayerManager {
  private peer: Peer | null = null;
  private connections: Map<string, DataConnection> = new Map();
  private peerIdToPlayerId: Map<string, string> = new Map();
  private hostConnection: DataConnection | null = null;
  private onStateUpdate: (state: GameState) => void = () => { };
  private onError: (error: string) => void = () => { };
  private onStatus: (status: string) => void = () => { };

  public connectionStatus: string = 'idle';

  public state: GameState = {
    roomId: '',
    players: [],
    currentTurnIndex: 0,
    status: 'waiting',
    turnTimeLeft: 60,
    mode: 'finance',
    globalModal: null,
    auction: {
      active: false,
      rolls: {},
      turnIndex: 0
    },
    levels: []
  };

  // Production backend hosted on Render
  private readonly PROD_SIGNALING_HOST = 'economyswitch.onrender.com';

  public myId: string = '';
  private myProfile: Player | null = null;
  private pendingJoinRoomId: string | null = null;

  setMyId(id: string) {
    if (!id || id === 'undefined' || id === '[object Object]' || id.includes('undefined')) {
      console.warn('[Multiplayer] Invalid ID passed to setMyId, keeping current or generating fallback.');
      if (!this.myId) this.myId = 'player_' + nanoid(6);
      return;
    }
    this.myId = id;
    console.log('[Multiplayer] Local ID set to:', this.myId);
  }

  private createInitialStats() {
    return {
      correctQuizzes: 0,
      wrongQuizzes: 0,
      costAnalysisCorrect: 0,
      costAnalysisWrong: 0,
      valueChainCorrect: 0,
      valueChainWrong: 0,
      investmentGains: 0,
      investmentLosses: 0,
      jailVisits: 0,
      jailSkips: 0,
      auctionWins: 0,
      taxesPaid: 0
    };
  }

  init(onUpdate: (state: GameState) => void, onError: (err: string) => void, onStatus?: (status: string) => void) {
    this.onStateUpdate = onUpdate;
    this.onError = onError;
    if (onStatus) this.onStatus = onStatus;
    // Notify immediate state on init to sync UI
    onUpdate({ ...this.state });
  }

  updateStatus(status: string) {
    this.connectionStatus = status;
    this.onStatus(status);
  }

  // Common ICE servers for better NAT traversal on phones/mobiles
  private readonly config = {
    config: {
      'iceServers': [
        { 'urls': 'stun:stun.l.google.com:19302' },
        { 'urls': 'stun:stun1.l.google.com:19302' },
        { 'urls': 'stun:stun2.l.google.com:19302' },
        { 'urls': 'stun:stun3.l.google.com:19302' },
        { 'urls': 'stun:stun4.l.google.com:19302' },
      ]
    }
  };

  private getPeerConfig(usePublicCloud = false) {
    if (usePublicCloud) {
       console.log('Falling back to PeerJS Public Cloud...');
       return { ...this.config }; // Uses default PeerServer cloud
    }

    // Priority 1: User-provided VITE_BACKEND_URL
    // We only use this if it's NOT pointing to localhost while we are in production.
    if (backendUrl) {
      try {
        const url = new URL(backendUrl);
        const isBackendLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
        
        if (!isLocalhost && isBackendLocal) {
           console.warn('[Multiplayer] Ignoring local backend URL (localhost) in production environment.');
        } else {
           return {
             ...this.config,
             host: url.hostname,
             port: url.port ? parseInt(url.port) : (url.protocol === 'https:' ? 443 : 80),
             secure: url.protocol === 'https:',
             path: '/peerjs'
           };
        }
      } catch (e) {
        console.error('Invalid VITE_BACKEND_URL:', e);
      }
    }

    // Priority 2: Dedicated Production Signaling Server (on Render)
    if (!isLocalhost) {
      return {
        ...this.config,
        host: this.PROD_SIGNALING_HOST,
        port: 443,
        secure: true,
        path: '/peerjs'
      };
    }

    // Priority 3: Local Development Fallback (Port 9000 as per server.js)
    return {
      ...this.config,
      host: window.location.hostname, // localhost
      port: 9000,
      secure: false,
      path: '/peerjs'
    };
  }

  private setupPeer(id: string, isRetry = false) {
    this.updateStatus(isRetry ? 'Retrying (Cloud Fallback)...' : 'Connecting to signaling server...');
    
    if (this.peer) {
      this.peer.destroy();
    }

    try {
      this.peer = new Peer(id, this.getPeerConfig(isRetry));
    } catch (e) {
      console.error('Peer creation failed immediately:', e);
      if (!isRetry) this.setupPeer(id, true);
      return;
    }

    this.peer.on('open', (peerId) => {
      console.log('Connected to signaling server with ID:', peerId);
      this.updateStatus('Signaling Established');
      
      // Host is "connected" as soon as signaling is up
      if (this.myProfile?.isHost) {
        // Short delay to ensure any transient states settle
        setTimeout(() => this.updateStatus('connected'), 500);
      }

      // Client: If we have a pending room to join, do it now
      if (this.pendingJoinRoomId) {
        this.performJoinRoom(this.pendingJoinRoomId);
      }
    });

    this.peer.on('error', (err) => {
      console.error('Peer error:', err.type, err.message);
      
      // If we failed to reach our custom server, try the public cloud
      if (!isRetry && (err.type === 'network' || err.type === 'server-error')) {
        this.setupPeer(id, true);
        return;
      }

      if (err.type === 'unavailable-id') {
        this.onError('Room ID already exists or Session is busy. Try again.');
      } else {
        this.onError('Connection error: ' + err.type);
      }
      this.updateStatus('error');
    });

    this.peer.on('connection', (conn) => {
      this.handleConnection(conn);
    });
  }

  createRoom(name: string, avatar: AvatarType): string {
    // ID Safety: We MUST have a valid ID before creating a room
    if (!this.myId || this.myId.includes('undefined')) {
      this.myId = 'player_' + nanoid(6);
      console.warn('[Multiplayer] ID missing or invalid during createRoom. Generated fallback ID:', this.myId);
    }

    const roomId = nanoid(6).toUpperCase();
    this.state.roomId = roomId;
    this.state.status = 'waiting';
    this.state.levels = generateLevels(250, 'finance', 0, undefined, false);
    
    this.myProfile = {
      id: this.myId,
      name,
      avatar,
      capital: 150000,
      position: 0,
      isHost: true,
      status: 'waiting',
      taxExemptTurns: 0,
      hasPaidTax: false,
      isInteracting: false,
      jailSkipped: false,
      stats: this.createInitialStats()
    };

    this.state.players = [this.myProfile];
    this.setupPeer(roomId);
    return roomId;
  }

  joinRoom(roomId: string, name: string, avatar: AvatarType) {
    // ID Safety: We MUST have a valid ID before joining a room
    if (!this.myId || this.myId.includes('undefined')) {
      this.myId = 'player_' + nanoid(6);
      console.warn('[Multiplayer] ID missing or invalid during joinRoom. Generated fallback ID:', this.myId);
    }

    this.state.roomId = roomId;

    this.myProfile = {
      id: this.myId,
      name,
      avatar,
      capital: 150000,
      position: 0,
      isHost: false,
      status: 'waiting',
      taxExemptTurns: 0,
      hasPaidTax: false,
      isInteracting: false,
      jailSkipped: false,
      stats: this.createInitialStats()
    };

    const clientPeerId = this.myId + '_' + nanoid(4);
    this.pendingJoinRoomId = roomId;
    this.setupPeer(clientPeerId);
  }

  private performJoinRoom(roomId: string) {
    if (!this.peer || this.peer.destroyed) return;
    
    this.updateStatus('Locating Host...');
    const conn = this.peer.connect(roomId, {
      metadata: { playerId: this.myId }
    });

    this.hostConnection = conn;

    conn.on('open', () => {
      this.pendingJoinRoomId = null; // Clear pending once join is initiated
      this.updateStatus('Joining Room...');
      this.sendMessage(conn, { type: 'JOIN_REQUEST', profile: this.myProfile! });
    });

    conn.on('data', (data: any) => {
      this.handleMessage(conn, data as Message);
    });

    conn.on('close', () => {
      console.warn('Disconnected from Host (Player:', this.myId, ')');
      this.onError('Disconnected from Host');
      this.updateStatus('disconnected');
      // Give UI time to show error before reload
      setTimeout(() => window.location.reload(), 2000);
    });

    conn.on('error', (err) => {
      console.error('Connection error with host:', err);
      this.onError('Could not connect to host.');
      this.updateStatus('error');
    });
  }

  private handleConnection(conn: DataConnection) {
    console.log('[Host] New peer connection established:', conn.peer);
    
    conn.on('data', (data: any) => {
      this.handleMessage(conn, data as Message);
    });

    conn.on('close', () => {
      const pid = this.peerIdToPlayerId.get(conn.peer);
      if (pid) {
        console.log(`[Host] Player ${pid} disconnected.`);
        this.state.players = this.state.players.filter(p => p.id !== pid);
        this.connections.delete(conn.peer);
        this.peerIdToPlayerId.delete(conn.peer);
        this.broadcastState();
      }
    });

    conn.on('error', (err) => {
      console.error('[Host] Connection error with peer:', conn.peer, err);
    });
  }

  disconnect() {
    console.log('Disconnecting from multiplayer...');
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    this.connections.clear();
    this.peerIdToPlayerId.clear();
    this.hostConnection = null;
    this.state = {
      roomId: '',
      players: [],
      currentTurnIndex: 0,
      status: 'waiting',
      turnTimeLeft: 60,
      mode: 'finance',
      globalModal: null,
      auction: { active: false, rolls: {}, turnIndex: 0 },
      levels: []
    };
    this.updateStatus('idle');
  }

  private handleMessage(conn: DataConnection, msg: Message) {
    if (this.myProfile?.isHost) {
      const senderPeerId = conn.peer;
      
      switch (msg.type) {
        case 'JOIN_REQUEST':
          console.log(`[Host] Received JOIN_REQUEST from peer: ${senderPeerId} (Profile: ${msg.profile.id})`);
          if (this.state.players.length < 6) {
            // Already connected on THIS specific peer? 
            const existingConn = this.connections.get(senderPeerId);
            if (existingConn && existingConn.open) {
                console.warn(`[Host] Peer ${senderPeerId} already connected. Skipping JOIN_REQUEST.`);
                return;
            }

            let profileToStore = { ...msg.profile };
            const isDuplicateAccount = this.state.players.some(p => p.id === profileToStore.id);
            
            if (isDuplicateAccount) {
              console.log(`[Host] Duplicate account detected for ${profileToStore.name}. Appending dev suffix.`);
              profileToStore.id = `${profileToStore.id}_dev_${nanoid(4)}`;
            }
            
            this.connections.set(senderPeerId, conn);
            this.peerIdToPlayerId.set(senderPeerId, profileToStore.id);
            this.state.players.push(profileToStore);
            
            console.log(`[Host] Added player ${profileToStore.name} (${profileToStore.id}). Total players: ${this.state.players.length}`);
            
            setTimeout(() => {
              this.broadcastState();
              console.log("[Host] Broadcasted initial state to all peers.");
            }, 300);
          }
          break;
        default:
          const senderId = this.peerIdToPlayerId.get(senderPeerId) || this.myId;
          this.handleAction(senderId, msg);
          break;
      }
    } else {
      if (msg.type === 'STATE_UPDATE') {
        console.log(`[Client] Received STATE_UPDATE from Host. Players: ${msg.state.players.length}`);
        // Only accept state if it's reasonably populated
        if (msg.state && msg.state.players && msg.state.players.length > 0) {
          const matchedMe = msg.state.players.some(p => {
              if (!p || !p.id) return false;
              const pidStr = String(p.id);
              const myIdStr = String(this.myId);
              
              if (myIdStr && pidStr.startsWith(myIdStr)) return true;
              return pidStr === myIdStr;
          });
          
          if (!matchedMe && msg.state.status === 'playing') {
              console.warn("[Client] Received state but I am not in the player list. This should only happen during initialization.");
          }

          this.state = { ...this.state, ...msg.state };
          this.onStateUpdate(this.state);

          // Once client sees themselves in the list, they are truly connected
          if (matchedMe && this.connectionStatus !== 'connected') {
            this.updateStatus('connected');
          }
        } else {
            console.warn("[Client] Received malformed or empty state. Ignoring.");
        }
      }
    }
  }

  private checkWinCondition() {
    const winner = this.state.players.find(p => p.capital >= 1000000);
    if (winner && this.state.status !== 'finished') {
      this.state.status = 'finished';
    }
  }

  private handleAction(playerId: string, msg: Message) {
    const playerIndex = this.state.players.findIndex(p => p.id === playerId);
    const player = this.state.players[playerIndex];
    if (!player) return;

    const isMyTurn = this.state.currentTurnIndex === playerIndex;
    const allowedActions: Message['type'][] = [
      'ACTION_AUCTION_ROLL', 'ACTION_INTERACTION_START', 'ACTION_INTERACTION_END', 
      'JOIN_REQUEST', 'UPDATE_LEVELS', 'ACTION_AUCTION_END'
    ];

    if (!isMyTurn && !allowedActions.includes(msg.type)) return;

    switch (msg.type) {
      case 'ACTION_DICE_ROLL':
        player.position += msg.steps;
        if (player.taxExemptTurns > 0) player.taxExemptTurns--;

        // Robust Infinite Map: If player is near current end, Host generates more
        if (player.position >= this.state.levels.length - 30) {
          const lastField = this.state.levels[this.state.levels.length - 1];
          const newLevels = generateLevels(120, this.state.mode, lastField.id + 1, undefined, false);
          this.state.levels = [...this.state.levels, ...newLevels];
        }

        const boardField = this.state.levels[player.position]?.type;
        if (boardField === 'auction_insurance' && this.state.mode === 'finance') {
          this.state.auction = { active: true, rolls: {}, turnIndex: 0 };
        }
        break;
      case 'ACTION_QUIZ_RESULT':
        if (msg.success) {
          player.capital += msg.reward;
          player.stats.correctQuizzes++;
        } else {
          player.capital -= msg.penalty;
          player.stats.wrongQuizzes++;
        }
        break;
      case 'ACTION_COST_ANALYSIS_RESULT':
        if (msg.success) {
          player.capital += msg.reward;
          player.stats.costAnalysisCorrect++;
        } else {
          player.capital -= msg.penalty;
          player.stats.costAnalysisWrong++;
        }
        break;
      case 'ACTION_VALUE_CHAIN_RESULT':
        if (msg.success) {
          player.capital += msg.reward;
          player.stats.valueChainCorrect++;
        } else {
          player.capital -= msg.penalty;
          player.stats.valueChainWrong++;
        }
        break;
      case 'ACTION_TAX_PAY':
        player.capital -= msg.amount;
        player.stats.taxesPaid++;
        break;
      case 'ACTION_TAX_COLLECT':
        break;
      case 'ACTION_INVEST':
        player.capital -= msg.stake;
        const investResult = Math.floor(msg.stake * msg.result);
        player.capital += investResult;
        if (investResult > msg.stake) {
          player.stats.investmentGains += (investResult - msg.stake);
        } else if (investResult < msg.stake) {
          player.stats.investmentLosses += (msg.stake - investResult);
        }
        break;
      case 'ACTION_INSURANCE_BUY':
        player.capital -= msg.cost;
        player.taxExemptTurns = 3;
        break;
      case 'ACTION_THEME_SWITCH':
        this.state.mode = msg.mode;
        this.state.globalModal = 'switch';
        player.isInteracting = true; // Block turn timer while global modal is active
        break;
      case 'ACTION_AUCTION_START':
        this.state.auction = { active: true, rolls: {}, turnIndex: 0 };
        break;
      case 'ACTION_AUCTION_ROLL':
        const auctionPlayerIds = this.state.players.map(p => p.id);
        if (auctionPlayerIds.length === 0) return;
        const expectedId = auctionPlayerIds[this.state.auction.turnIndex % auctionPlayerIds.length];
        if (playerId !== expectedId) return;
        this.state.auction.rolls[playerId] = msg.roll;
        this.state.auction.turnIndex++;
        if (this.state.auction.turnIndex >= this.state.players.length) {
          const rolls = Object.entries(this.state.auction.rolls);
          const maxRoll = Math.max(...rolls.map(([_, r]) => r));
          rolls.filter(([_, r]) => r === maxRoll).forEach(([winId]) => {
            const winner = this.state.players.find(p => p.id === winId);
            if (winner) {
              winner.taxExemptTurns = 3;
              winner.stats.auctionWins++;
            }
          });
        }
        break;
      case 'ACTION_JAIL_WAIT':
        player.status = 'jail';
        player.jailSkipped = false;
        player.stats.jailVisits++;
        break;
      case 'ACTION_JAIL_SKIP':
        player.jailSkipped = true;
        player.isInteracting = false;
        player.stats.jailSkips++;
        
        if (this.state.players.length > 0) {
          const nextIdx = (this.state.currentTurnIndex + 1) % this.state.players.length;
          this.state.currentTurnIndex = nextIdx;
          const nextP = this.state.players[nextIdx];
          if (nextP && nextP.status === 'jail' && nextP.jailSkipped) {
            nextP.status = 'playing';
            nextP.jailSkipped = false;
          }
        }
        break;
      case 'ACTION_JAIL_PAY':
        player.capital -= msg.fine;
        player.status = 'playing';
        player.jailSkipped = false;
        break;
      case 'ACTION_TAX_EXEMPT':
        if (msg.playerId) {
          const tgt = this.state.players.find(p => p.id === msg.playerId);
          if (tgt) tgt.taxExemptTurns = msg.turns;
        } else {
          player.taxExemptTurns = msg.turns;
        }
        break;
      case 'ACTION_TAX_COLLECT_FROM_PLAYERS':
        msg.targets.forEach(tid => {
          const tgt = this.state.players.find(p => p.id === tid);
          if (tgt && tgt.taxExemptTurns === 0) {
            tgt.capital -= msg.amountPerPlayer;
            player.capital += msg.amountPerPlayer;
            tgt.stats.taxesPaid++;
          }
        });
        break;
      case 'ACTION_INTERACTION_START':
        player.isInteracting = true;
        break;
      case 'ACTION_INTERACTION_END':
        player.isInteracting = false;
        this.state.globalModal = null; // Clear global modal if active
        if (this.state.players.length > 0) {
          const nextI = (this.state.currentTurnIndex + 1) % this.state.players.length;
          const nextIP = this.state.players[nextI];
          if (nextIP && nextIP.status === 'jail' && nextIP.jailSkipped) {
            nextIP.status = 'playing';
            nextIP.jailSkipped = false;
          }
          this.state.currentTurnIndex = nextI;
        }
        break;
      case 'ACTION_AUCTION_END':
        this.state.auction.active = false;
        this.state.globalModal = null; // Clear global modal if active
        this.state.players.forEach(p => { if (p) p.isInteracting = false; });
        if (this.state.players.length > 0) {
          const aNex = (this.state.currentTurnIndex + 1) % this.state.players.length;
          const aNexP = this.state.players[aNex];
          if (aNexP && aNexP.status === 'jail' && aNexP.jailSkipped) {
            aNexP.status = 'playing';
            aNexP.jailSkipped = false;
          }
          this.state.currentTurnIndex = aNex;
        }
        break;
      case 'UPDATE_LEVELS':
        this.state.levels = msg.levels;
        break;
    }
    this.checkWinCondition();
    this.broadcastState();
  }

  private broadcastState() {
    const fullState = { ...this.state };
    this.connections.forEach(conn => {
      this.sendMessage(conn, { type: 'STATE_UPDATE', state: fullState });
    });
    this.onStateUpdate(fullState);
  }

  private sendMessage(conn: DataConnection, msg: Message) {
    conn.send(msg);
  }

  leaveRoom() {
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    this.connections.clear();
    this.hostConnection = null;
    this.state = {
      roomId: '',
      players: [],
      currentTurnIndex: 0,
      status: 'waiting',
      turnTimeLeft: 60,
      mode: 'finance',
      auction: { active: false, rolls: {}, turnIndex: 0 },
      levels: [],
      globalModal: null
    };
    this.onStateUpdate({ ...this.state });
  }

  startGame() {
    if (this.myProfile?.isHost && this.state.players.length >= 2) {
      this.state.status = 'playing';
      this.broadcastState();
    }
  }

  sendAction(msg: Message) {
    if (this.myProfile?.isHost) {
      this.handleAction(this.myId, msg);
    } else if (this.hostConnection) {
      this.sendMessage(this.hostConnection, msg);
    }
  }

  getMyProfile() {
    return this.state.players.find(p => p.id === this.myId);
  }

  getMyId() { return this.myId; }
}

export const multiplayer = new MultiplayerManager();

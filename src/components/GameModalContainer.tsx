import { GameMode, financeQuizzes, sustainabilityQuizzes, incomeEvents, expenseEvents, jailMessages, Level, financeCostAnalysis, sustainabilityCostAnalysis } from '../data/gameData';
import { IncomeModal, ExpenseModal, QuizModal, JailModal, SwitchModal, InvestmentModal, TaxSmallModal, TaxLargeModal, AuctionModal, InsuranceModal, VictoryModal, JailSkipModal, TurnAnnouncementModal, CostAnalysisModal } from './GameModal';
import { multiplayer } from '../services/MultiplayerManager';
import { Player } from '../types/game';

interface GameModalContainerProps {
  activeField: string | null;
  onClose: () => void;
  balance: number;
  levelIndex: number;
  mode: GameMode;
  onBalanceChange: (change: number, metadata?: { type: string, stake?: number, multiplier?: number }) => void;

  onModeChange: (mode: GameMode) => void;
  onTaxExemption: (turns: number) => void;
  onAuctionWin?: () => void;
  onTaxPaid?: () => void;
  onJailSkip?: () => void;
  levels: Level[];
  players: Player[];
  isSinglePlayer: boolean;
  language: 'en' | 'sr';
}

const GameModalContainer: React.FC<GameModalContainerProps> = ({
  activeField,
  onClose,
  balance,
  levelIndex,
  mode,
  onBalanceChange,

  onModeChange,
  onTaxExemption,
  onAuctionWin,
  onTaxPaid,
  onJailSkip,
  levels,
  players,
  isSinglePlayer,
  language,
}) => {
  const isAuctionActive = multiplayer.state.auction.active;
  const isGameOver = multiplayer.state.status === 'finished';
  const globalModal = multiplayer.state.globalModal;

  // Jail Skip logic: If it's MY turn and I am in jail, show JailSkipModal
  const myProfile = multiplayer.getMyProfile();
  const isMyTurn = players[multiplayer.state.currentTurnIndex]?.id === myProfile?.id;
  const showJailSkip = isMyTurn && myProfile?.status === 'jail' && !myProfile?.jailSkipped && !multiplayer.state.auction.active;

  const showModal = activeField || isAuctionActive || isGameOver || showJailSkip || globalModal;

  if (!showModal) return null;

  // Prioritize VictoryModal
  if (isGameOver) {
    let displayPlayers = players;
    if (isSinglePlayer) {
      // In single player, construct a dummy player for victory screen with current stats
      displayPlayers = [{
        id: 'single',
        name: multiplayer.getMyProfile()?.name || 'You',
        avatar: multiplayer.getMyProfile()?.avatar || '1',
        capital: balance,
        position: levelIndex,
        isHost: true,
        status: 'playing',
        taxExemptTurns: 0,
        hasPaidTax: false,
        isInteracting: false,
        jailSkipped: false,
        stats: multiplayer.getMyProfile()?.stats || {
          correctQuizzes: 0,
          wrongQuizzes: 0,

          investmentGains: 0,
          investmentLosses: 0,
          jailVisits: 0,
          jailSkips: 0,
          auctionWins: 0,
          taxesPaid: 0
        }
      }];
    }
    return <VictoryModal players={displayPlayers} language={language} />;
  }

  // Prioritize JailSkipModal
  if (showJailSkip) {
    return (
      <JailSkipModal
        mode={mode}
        language={language}
        onSkip={() => {
          if (onJailSkip) onJailSkip();
          multiplayer.sendAction({ type: 'ACTION_JAIL_SKIP' });
          // DO NOT call onClose() here. 
          // ACTION_JAIL_SKIP already increments the turn index,
          // which will cause showJailSkip to become false and the modal to hide.
          // Calling onClose() triggers ACTION_INTERACTION_END, incrementing turn AGAIN.
        }}
      />
    );
  }

  // Handle Global Switch Modal (Multiplayer Sync)
  if (globalModal === 'switch') {
    return (
      <SwitchModal
        fromMode={mode}
        toMode={mode === 'finance' ? 'sustainability' : 'finance'}
        language={language}
        onClose={() => {
          const myId = multiplayer.getMyId();
          const activePlayerId = players[multiplayer.state.currentTurnIndex]?.id;
          const isMyTurn = myId === activePlayerId;

          if (!isSinglePlayer) {
            // Only the player whose turn it was should officially "end" the interaction
            // to avoid multiple clients incrementing the turn counter.
            if (isMyTurn) {
              multiplayer.sendAction({ type: 'ACTION_INTERACTION_END' });
            }
          } else {
            onModeChange(mode === 'finance' ? 'sustainability' : 'finance');
            onClose();
          }
          
          // Local cleanup for the landing player if they had activeField set
          if (activeField === 'switch') {
             onClose();
          }
        }}
      />
    );
  }

  const currentQuizzes = mode === 'finance' ? financeQuizzes : sustainabilityQuizzes;
  const currentCostAnalysis = mode === 'finance' ? financeCostAnalysis : sustainabilityCostAnalysis;


  // Pick random content
  // Use a hash of levelIndex and potentially game session to get more variety,
  // but for "no repeat within session", we can use a randomized offset generated at start.
  // For now, let's just use levelIndex but we could add a session seed.
  const quiz = currentQuizzes[levelIndex % currentQuizzes.length];
  const costAnalysisScenario = currentCostAnalysis[levelIndex % currentCostAnalysis.length];

  const income = incomeEvents[levelIndex % incomeEvents.length];
  const expense = expenseEvents[levelIndex % expenseEvents.length];
  const jail = jailMessages[levelIndex % jailMessages.length];

  // If Auction is active, prioritize it
  if (isAuctionActive) {
    const currentTurnIndex = multiplayer.state.currentTurnIndex;
    const activePlayerIndex = currentTurnIndex;
    const activePlayerId = players[activePlayerIndex]?.id;
    const canContinue = multiplayer.getMyId() === activePlayerId;

    return (
      <AuctionModal
        mode={mode}
        language={language}
        players={multiplayer.state.players}
        currentPlayerIndex={activePlayerIndex}
        canContinue={canContinue}
        onResult={(won) => {
          if (won) {
            onTaxExemption(3);
            if (onAuctionWin) onAuctionWin();
          }
          multiplayer.sendAction({ type: 'ACTION_AUCTION_END' });
          onClose();
        }}
      />
    );
  }

  switch (activeField) {
    case 'income':
      return (
        <IncomeModal
          title={income.title}
          description={income.description}
          icon={income.icon}
          mode={mode}
          language={language}
          onResult={(finalAmount) => {
            onBalanceChange(finalAmount);
            onClose();
          }}
        />
      );
    case 'expense':
      const expensePlayer = players.find(p => p.id === multiplayer.getMyId());
      const isInsured = (expensePlayer?.taxExemptTurns || 0) > 0;
      return (
        <ExpenseModal
          title={expense.title}
          description={expense.description}
          icon={expense.icon}
          mode={mode}
          language={language}
          isInsured={isInsured}
          onResult={(finalAmount) => {
            onBalanceChange(-finalAmount);
            onClose();
          }}
        />
      );
    case 'quiz':
      return (
        <QuizModal
          quiz={quiz}
          mode={mode}
          language={language}
          onResult={(correct, reward, penalty) => {
            onBalanceChange(correct ? reward : -penalty);
            onClose();
          }}
        />
      );

    case 'cost_analysis':
      return (
        <CostAnalysisModal
          scenario={costAnalysisScenario}
          mode={mode}
          language={language}
          onResult={(correct, reward, penalty) => {
            onBalanceChange(correct ? reward : -penalty);
            // Optionally update stats here if desired (like we do for quiz using correct/wrong but stats track it in App/Multiplayer)
            onClose();
          }}
        />
      );

    case 'jail':
      return (
        <JailModal
          title={jail.title}
          description={jail.description}
          icon={jail.icon}
          jailFine={75000}
          balance={balance}
          mode={mode}
          language={language}
          onPay={() => {
            if (isSinglePlayer) {
              onBalanceChange(-75000);
            } else {
              multiplayer.sendAction({ type: 'ACTION_JAIL_PAY', fine: 75000 });
            }
            onClose();
          }}
          onSkip={() => {
            if (isSinglePlayer) {
              multiplayer.state.currentTurnIndex = (multiplayer.state.currentTurnIndex + 1) % players.length;
            } else {
              multiplayer.sendAction({ type: 'ACTION_JAIL_WAIT' });
            }
            onClose();
          }}
        />
      );
    case 'switch':
      return (
        <SwitchModal
          fromMode={mode}
          toMode={mode === 'finance' ? 'sustainability' : 'finance'}
          language={language}
          onClose={() => {
            onModeChange(mode === 'finance' ? 'sustainability' : 'finance');
            onClose();
          }}
        />
      );
    case 'investment':
      return (
        <InvestmentModal
          balance={balance}
          mode={mode}
          language={language}
          onResult={(profit, stake, multiplier) => {
            onBalanceChange(profit, { type: 'investment', stake, multiplier });
            onClose();
          }}
        />
      );
    case 'tax_small':
      const myTaxProfile = multiplayer.state.players.find(p => p.id === multiplayer.getMyId());
      const myTaxExemption = myTaxProfile?.taxExemptTurns || 0;
      const smallTaxAmount = 35000;
      return (
        <TaxSmallModal
          taxExemptionTurns={myTaxExemption}
          mode={mode}
          language={language}
          amount={smallTaxAmount}
          onClose={() => {
            if (!myTaxExemption) {
              if (onTaxPaid) onTaxPaid();
              if (isSinglePlayer) {
                onBalanceChange(-smallTaxAmount);
              } else {
                multiplayer.sendAction({ type: 'ACTION_TAX_PAY', amount: smallTaxAmount });
              }
            }
            onClose();
          }}
        />
      );
    case 'tax_large':
      const myId = multiplayer.getMyId();
      const otherPlayers = multiplayer.state.players.filter(p => p.id !== myId);
      const targets = otherPlayers.filter(p => {
        const field = levels[p.position % levels.length];
        return field.type === 'tax_small';
      });

      return (
        <TaxLargeModal
          targets={targets}
          mode={mode}
          language={language}
          onCollect={(targetIds) => {
            multiplayer.sendAction({
              type: 'ACTION_TAX_COLLECT_FROM_PLAYERS',
              targets: targetIds,
              amountPerPlayer: 35000
            });
            onClose();
          }}
          onClose={onClose}
        />
      );
    case 'auction_insurance':
      // This is now handled by the isAuctionActive check at top for Finance mode
      if (mode === 'sustainability') {
        return (
          <InsuranceModal
            balance={balance}
            price={35000}
            mode={mode}
            language={language}
            onBuy={(price) => {
              onBalanceChange(-price);
              onTaxExemption(3);
              onClose();
            }}
            onClose={onClose}
          />
        );
      }
      return null;
    case 'turn_announcement':
      return <TurnAnnouncementModal onComplete={onClose} language={language} />;
    default:
      return null;
  }
};

export default GameModalContainer;

import { useState } from 'react';


//Copilot helped with types
type CheckoutWizardProps = {
  subtotal: number;
  onClose: () => void;
  onComplete: () => void;
  onLeaveFeedback: () => void;
};

function CheckoutWizard({ subtotal, onClose, onComplete, onLeaveFeedback }: CheckoutWizardProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');

  const STEPS = ['Delivery', 'Payment', 'Done'];

  return (
    
    <div style={{ position: 'fixed', inset: 0, background: '#e1ebe3', padding: '24px' }}>
      <button onClick={onClose} style={{ float: 'right', fontSize: '1.2rem', cursor: 'pointer', color: '#000000' }}>✕</button>
      <p style={{ marginBottom: '16px' }}>
        Step {step + 1} of {STEPS.length}: <strong>{STEPS[step]}</strong>
      </p>

{/* First user gives delivery details */}
      {step === 0 && (
        <div>
          <h3>Delivery details</h3>
          <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '300px' }} />
          <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '300px' }} />
          <button onClick={() => setStep(1)} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            Continue
          </button>
        </div>
      )}

{/* Then he does his payment (not real) */}
      {step === 1 && (
        <div>
          <h3>Payment</h3>
          <p>Demo only.</p>
          <input placeholder="Card number" value={card} onChange={(e) => setCard(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '300px' }} />
          <input placeholder="CVV" value={card} onChange={(e) => setCard(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '300px' }} />
          <input placeholder="Expiration date" value={card} onChange={(e) => setCard(e.target.value)} style={{ display: 'block', margin: '8px 0', padding: '8px', width: '300px' }} />
          <button onClick={() => setStep(0)} style={{ marginRight: '8px', padding: '8px 12px', cursor: 'pointer' }}>Back</button>
          <button onClick={() => setStep(2)} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            Pay ${subtotal.toFixed(2)}
          </button>
        </div>
      )}

{/* Finally, he sees the confirmation */}
      {step === 2 && (
        <div>
          <h3>Thanks,</h3>
          <p>Your order is confirmed.</p>
          <button onClick={onComplete} style={{ padding: '8px 12px', cursor: 'pointer' }}>Back to shop</button>
          <button onClick={onLeaveFeedback} style={{ marginLeft: '8px', padding: '8px 12px', cursor: 'pointer' }}>
            Leave feedback
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckoutWizard;
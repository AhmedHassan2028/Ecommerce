import { useState } from 'react';

//Copilot helped with types
type SurveyProps = {
  onClose: () => void;
};

function Survey({ onClose }: SurveyProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#ffffff', zIndex: 60, padding: '24px' }}>
        <h3>Thanks for the feedback!</h3>
        <button onClick={onClose} style={{ padding: '8px 12px', cursor: 'pointer' }}>Back to shop</button>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#ffffff', zIndex: 60, padding: '24px' }}>
      <button onClick={onClose} style={{ padding: '8px 12px', cursor: 'pointer' }}>Close</button>
      <h3>How was your shopping today?</h3>

      <div style={{ margin: '16px 0', fontSize: '1.4rem' }}>
        {/* so we can choose a rating out of 5, the gold color is only for the selected stars */}
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} onClick={() => setRating(n)} style={{ color: n <= rating ? '#caa73d' : '#999', cursor: 'pointer' }}>★</span>
        ))}
      </div>

      <textarea
        placeholder="Anything you'd like to share?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ display: 'block', width: '300px', height: '80px', padding: '8px', marginBottom: '12px' }}
      />

      <button disabled={rating === 0} onClick={() => setSubmitted(true)} style={{ padding: '8px 12px', cursor: 'pointer' }}>
        Submit feedback
      </button>
    </div>
  );
}

export default Survey;
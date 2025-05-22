import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { create_quote } from '../gqloperations/mutations';
import { get_all_quote } from '../gqloperations/queries';
import { useNavigate } from 'react-router-dom';

const CreateQuote = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('');

  const [createQuote, { error, loading, data }] = useMutation(create_quote, {
    refetchQueries: [{ query: get_all_quote }]
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quote.trim()) return;
    createQuote({ variables: { name: quote } });
    setQuote('');
  };

  return (
    <div className="container quote-form-container">
      <div className="card z-depth-3 quote-form-card">
        <div className="card-content">
          <h4 className="center-align blue-grey-text text-darken-3">📝 Create a Quote</h4>
          <div className="divider" style={{ margin: '20px 0' }}></div>

          {loading && (
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          )}

          {error && (
            <div className="card-panel red lighten-2 white-text">
              {error.message}
            </div>
          )}

          {data && (
            <div className="card-panel green lighten-2 white-text">
              Quote posted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                id="quote"
                name="quote"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Write your inspirational quote..."
                required
              />
              <label htmlFor="quote" className="active">Quote</label>
            </div>

            <button
              type="submit"
              className="btn waves-effect waves-light blue-grey darken-2 z-depth-1"
              style={{ width: "100%" }}
              disabled={loading}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuote;

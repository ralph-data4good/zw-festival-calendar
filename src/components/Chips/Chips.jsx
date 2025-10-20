import React from 'react';
import { useStore } from '../../app/store';
import styles from './Chips.module.css';

function Chips() {
  const campaigns = useStore((state) => state.getFeaturedCampaigns());
  const filters = useStore((state) => state.filters);
  const setFilter = useStore((state) => state.setFilter);

  const handleChipClick = (campaignId) => {
    if (filters.campaign === campaignId) {
      setFilter('campaign', '');
    } else {
      setFilter('campaign', campaignId);
    }
  };

  if (campaigns.length === 0) return null;

  return (
    <div className={styles.chipsContainer}>
      <h3 className={styles.chipsTitle}>Featured Campaigns</h3>
      <div className="chips">
        {campaigns.map((campaign) => (
          <button
            key={campaign.id}
            type="button"
            className={`chip ${filters.campaign === campaign.id ? 'active' : ''}`}
            onClick={() => handleChipClick(campaign.id)}
          >
            {campaign.emoji && <span>{campaign.emoji}</span>}
            {campaign.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Chips;

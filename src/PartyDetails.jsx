import React, { useState } from 'react';
import RSVPPopup from './RSVPPopup';

const PartyDetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Party details data
  const details = [
    {
      id: 1,
      icon: '🗓️',
      title: 'Date & Time',
      content: 'Sat, May 3rd, 2024 at 5:30 PM IST',
    },
    {
      id: 2,
      icon: '📍',
      title: 'Location',
      content: 'Godrej D Block Rooftop',
    },
    {
      id: 3,
      icon: '🗺️',
      title: 'Directions',
      content: 'Get Directions',
      isLink: true,
      link: 'https://www.google.co.in/maps/place/Godrej+Air+Tower+D/@12.987617,77.7114007,20z/data=!4m6!3m5!1s0x3bae110015a7dcbd:0xed7913a3250cd119!8m2!3d12.987618!4d77.711782!16s%2Fg%2F11wtl7kf0c?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNjQwSAFQAw%3D%3D',
    },
    {
      id: 4,
      icon: '👔',
      title: 'Dress Code',
      content: 'Pastel Preferred',
    },
    {
      id: 5,
      icon: '🎁',
      title: 'Included',
      content: 'Food, Drinks & Good Vibes',
    },
    {
      id: 6,
      icon: '☕',
      title: 'Bring',
      content: 'Your tea to spill !!',
    },
  ];

  const handleRSVPClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className='party-details-container'>
      <h3 className='party-details-heading'>Party Details</h3>

      <div className='party-details-cards'>
        {details.map((detail) => (
          <div key={detail.id} className='party-detail-card'>
            {/* <div className='party-detail-icon'>{detail.icon}</div> */}
            <div className='party-detail-content'>
              <h4 className='party-detail-title'>
                {detail.icon} {detail.title}
              </h4>
              {detail.isLink ? (
                <a
                  href={detail.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='party-detail-link'
                >
                  {detail.content}
                </a>
              ) : (
                <p className='party-detail-text'>{detail.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className='rsvp-button' onClick={handleRSVPClick}>
        RSVP
      </button>

      {/* RSVP Popup */}
      <RSVPPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default PartyDetails;

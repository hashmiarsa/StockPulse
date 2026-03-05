import React from "react";

const ShowcaseCardSkeleton = () => {
  return (
    <>
      {[...Array(3).keys()].map(index => (
        <div key={index} style={{
          background: 'white',
          borderRadius: '16px',
          border: '1px solid #f0f0f0',
          width: '280px',
          margin: '8px',
          overflow: 'hidden',
          padding: '0 0 20px 0'
        }}>
          {/* Image area */}
          <div style={{ background: '#f9fafb', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="animate-pulse" style={{ width: '72px', height: '72px', background: '#e5e7eb', borderRadius: '12px' }}></div>
          </div>
          {/* Content */}
          <div style={{ padding: '16px 20px' }}>
            <div className="animate-pulse" style={{ height: '16px', background: '#f3f4f6', borderRadius: '6px', marginBottom: '8px', width: '70%' }}></div>
            <div className="animate-pulse" style={{ height: '12px', background: '#f3f4f6', borderRadius: '6px', marginBottom: '16px', width: '40%' }}></div>
            <div className="animate-pulse" style={{ height: '30px', background: '#f3f4f6', borderRadius: '20px', marginBottom: '12px', width: '50%' }}></div>
            <div className="animate-pulse" style={{ height: '64px', background: '#f3f4f6', borderRadius: '8px' }}></div>
          </div>
          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px', padding: '0 20px' }}>
            <div className="animate-pulse" style={{ flex: 1, height: '38px', background: '#d1fae5', borderRadius: '8px' }}></div>
            <div className="animate-pulse" style={{ flex: 1, height: '38px', background: '#f3f4f6', borderRadius: '8px' }}></div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ShowcaseCardSkeleton;

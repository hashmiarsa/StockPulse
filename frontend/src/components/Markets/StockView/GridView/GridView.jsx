import React from 'react';
import GridViewSkeleton from './GridViewSkeleton';
import StockCard from '../../../StockCard/StockCard';

const GridView = (props) => {
  const { socket, filteredStocks } = props;

  return (
    <>
      <style>{`
        .gv-wrap {
          padding: 24px;
        }
        .gv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }
      `}</style>

      <div className="gv-wrap">
        <div className="gv-grid">
          {!filteredStocks?.length ? (
            <GridViewSkeleton />
          ) : (
            filteredStocks.map((stock) => (
              <StockCard key={stock._id} stock={stock} socket={socket} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default GridView;

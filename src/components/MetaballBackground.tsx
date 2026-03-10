const MetaballBackground = () => {
  return (
    <div className="metaball-scene" aria-hidden>
      <div className="metaball-cluster">
        <span className="metaball metaball-1" />
        <span className="metaball metaball-2" />
        <span className="metaball metaball-3" />
        <span className="metaball metaball-4" />
        <span className="metaball metaball-5" />
      </div>
      <div className="metaball-glass-overlay">
        <span className="metaball-glass metaball-glass-1" />
        <span className="metaball-glass metaball-glass-2" />
        <span className="metaball-glass metaball-glass-3" />
        <span className="metaball-glass metaball-glass-4" />
        <span className="metaball-glass metaball-glass-5" />
      </div>
    </div>
  );
};

export default MetaballBackground;

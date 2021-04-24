import React from 'react';
import { StoreContext } from '../Store';

const LayerGroupCollapsed = (props) => {
  return (
    <div className="layers" key={props.i}>
      <div
        className="name"
        id={props.id}
        style={{ height: "45px" }}
        onClick={props.toggleSection}
      >
        {props.layerGroup.name}
      </div>
    </div>
  );
};

const LayerGroupOpen = (props) => {
  
  return (
    <div className="layers" key={props.i}>
      <div className="name" id={props.id} onClick={props.toggleSection}>
        {props.layerGroup.name}
      </div>
      <div className="grid">
        {props.layerGroup.layers.map((layer, j) => {
          return (
            <div
              className="btn"
              onClick={(e) => {
                props.setToolMode({
                  name: "layer",
                  layer: { ...layer },
                });
              }}
              key={j}
            >
              {layer.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LayerGroups = (props={store:StoreContext}) => {
  let { layerGroups, layerGroupsState } = props.store;

  function toggleSection(e) {
    layerGroups[e.target.id].visible = ~layerGroups[e.target.id].visible;
    layerGroupsState({
      ...layerGroups,
    });
  }

  return (
    <div className="layergroups">
      {Object.keys(layerGroups).map((layerGroup, i) => {
        return layerGroups[layerGroup].visible ? (
          <LayerGroupOpen
            key={i}
            id={layerGroup}
            layerGroup={layerGroups[layerGroup]}
            toggleSection={toggleSection}
            
            { ...props }
          />
        ) : (
          <LayerGroupCollapsed
            key={i}
            id={layerGroup}
            layerGroup={layerGroups[layerGroup]}
            toggleSection={toggleSection}
            
            { ...props }
          />
        );
      })}
    </div>
  );
};


export default LayerGroups;
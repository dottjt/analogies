import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as mobxPropTypes } from "mobx-react" 
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

/*
 *
 *
 *
 *  
 *  CHECKLIST STATE
 *
 *
 * 
 *  
 */

const checklistItemsFull = [
  { label: "Brush teeth",
    selected: false,
    disabled: false,
    id: "c1",
  },
  { label: "Cry in the shower alone",
    selected: false,
    disabled: false,
    id: "c2",
  },
  { label: "Consume an entire bucket of icecream",
    selected: false,
    disabled: false,
    id: "c3",
  },
];

const checklistItemsPartial = [
  { label: "Buy heaps of drugs",
    selected: false,
    disabled: true,
    id: "c1",
  },
  { label: "Burn the house down",
    selected: false,
    disabled: true,
    id: "c2",
  },
  { label: "Watch cat videos",
    selected: true,
    disabled: false,
    id: "c3",
  },
];

const checklistItemsDrugs = [
  { label: "Take illegal drugs",
    annotation: "(I don't know?)",
    selected: false,
    disabled: false,
    id: "c1",
  },
  { label: "Steal an expensive car",
    annotation: "(this could end poorly?)",
    selected: false,
    disabled: false,
    id: "c2",
  },
  { label: "Watch cat videos",
    annotation: "(hell yeah!)",
    selected: false,
    disabled: false,
    id: "c3",
  },
];

const selectChecklistItem = (list, label, disabled) => (
  !disabled ? list.map(item => (
    item.label === label ? 
    { ...item, selected: !item.selected } : 
    { ...item })
  ) : list
)

class ChecklistStateFull {
  @observable checklistItems = checklistItemsFull;

  @action selectChecklistItem = (label, disabled) => {
    this.checklistItems = selectChecklistItem(this.checklistItems, label, disabled);
  }
}

class ChecklistStatePartial {
  @observable checklistItems = checklistItemsPartial;

  @action selectChecklistItem = (label, disabled) => { 
    this.checklistItems = selectChecklistItem(this.checklistItems, label, disabled);
  }
}

class ChecklistStateDrugs {
  @observable checklistItems = checklistItemsDrugs;

  @action selectChecklistItem = (label, disabled) => { 
    this.checklistItems = selectChecklistItem(this.checklistItems, label, disabled);
  }
}



/*
 *
 *
 *
 *  
 *  CHECKLIST CHECKBOX
 *
 *
 * 
 *  
 */


const Checkbox = ({ bool }) => (
  bool ? (
    <div className="checkbox checkbox__checked"></div>
  ) : (
    <div className="checkbox"></div>
  )
);

Checkbox.propTypes = {
  bool: PropTypes.bool,
};


/*
 *
 *
 *
 *  
 *  CHECKLIST ITEM
 *
 *
 * 
 *  
 */


export class ChecklistItem extends React.Component {

  constructor() {
    super();
    this.state={ onMouseDown: false };
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }
  
  onMouseUp(event, disabled) {
    if(!disabled) {
      this.setState({
        onMouseDown: false,
      });  
    }
  }

  onMouseDown(event, disabled) {
    if(!disabled) {
      this.setState({
        onMouseDown: true,
      });  
    }
  }

  render() {
    const { label, annotation, disabled, selected, id, onClick } = this.props;

    return (
      <li className={`checkbox__item checkbox__item__onclick__${this.state.onMouseDown} checkbox__item__disabled__${disabled}`} id={id}
        onClick={() => onClick()}
        onMouseDown={(event) => this.onMouseDown(event, disabled)}
        onMouseUp={(event) => this.onMouseUp(event, disabled)}
      >
        <Checkbox bool={selected}/><p className="text">{label}</p>
        
        {annotation ? <span className="annotation">{annotation}</span> : null}
      </li>  
    )
  }
}

ChecklistItem.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  annotation: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};


/*
 *
 *
 *
 *  
 *  CHECKLIST
 *
 *
 * 
 *  
 */


@observer
class Checklist extends React.Component {
  render() {
    return (
      <ul className="checkbox__list">
        {this.props.store.checklistItems.map(checklistItem => (
          <ChecklistItem 
            key={checklistItem.id}
            id={checklistItem.id}
            label={checklistItem.label}
            annotation={checklistItem.annotation}
            disabled={checklistItem.disabled}
            selected={checklistItem.selected}
            onClick={() => this.props.store.selectChecklistItem(checklistItem.label, checklistItem.disabled)}
          />
        ))
        }
      </ul>  
    )
  }
}

Checklist.propTypes = {
  store: PropTypes.shape({
    checklistItems: mobxPropTypes.observableArray,
    selectChecklistItem: PropTypes.func,  
  }),
};



/*
 *
 *
 *
 *  
 *  CHECKLIST CONTAINER
 *
 *
 * 
 *  
 */


const checklistStoreFull = new ChecklistStateFull();
const checklistStorePartial = new ChecklistStatePartial();
const checklistStoreDrugs = new ChecklistStateDrugs();

export class ChecklistFullContainer extends React.Component {
  render() {
    return (
      <Checklist 
        store={checklistStoreFull}
      /> 
    )
  }
}

export class ChecklistPartialContainer extends React.Component {
  render() {
    return (
      <Checklist 
        store={checklistStorePartial}
      /> 
    )
  }
}


export class ChecklistItemAnnotation extends React.Component {
  render() {
    return (
      <Checklist 
        store={checklistStoreDrugs}
      /> 
    )
  }
}


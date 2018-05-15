import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PropTypes as mobxPropTypes } from 'mobx-react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { IChecklist } from './types';

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

const checklistItemsFull: IChecklist.ChecklistItem[] = [
  { label: 'Brush teeth',
    selected: false,
    disabled: false,
    id: 'c1',
  },
  { label: 'Cry in the shower alone',
    selected: false,
    disabled: false,
    id: 'c2',
  },
  { label: 'Consume an entire bucket of icecream',
    selected: false,
    disabled: false,
    id: 'c3',
  },
];

const checklistItemsPartial: IChecklist.ChecklistItem[] = [
  { label: 'Buy heaps of drugs',
    selected: false,
    disabled: true,
    id: 'c1',
  },
  { label: 'Burn the house down',
    selected: false,
    disabled: true,
    id: 'c2',
  },
  { label: 'Watch cat videos',
    selected: true,
    disabled: false,
    id: 'c3',
  },
];

const checklistItemsDrugs: IChecklist.ChecklistItem[] = [
  { label: 'Take illegal drugs',
    annotation: '(I don\'t know?)',
    selected: false,
    disabled: false,
    id: 'c1',
  },
  { label: 'Steal an expensive car',
    annotation: '(this could end poorly?)',
    selected: false,
    disabled: false,
    id: 'c2',
  },
  { label: 'Watch cat videos',
    annotation: '(hell yeah!)',
    selected: false,
    disabled: false,
    id: 'c3',
  },
];

const selectChecklistItem = (list: IChecklist.ChecklistItem[], label: string, disabled: boolean) => (
  !disabled ? list.map(item => (
    item.label === label ? 
    { ...item, selected: !item.selected } : 
    { ...item })
  ) : list
);

class ChecklistStateFull {
  @observable checklistItems: IChecklist.ChecklistItem[] = checklistItemsFull;

  @action selectChecklistItem = (label: string, disabled: boolean) => {
    this.checklistItems = selectChecklistItem(this.checklistItems, label, disabled);
  }
}

class ChecklistStatePartial {
  @observable checklistItems: IChecklist.ChecklistItem[] = checklistItemsPartial;

  @action selectChecklistItem = (label: string, disabled: boolean) => { 
    this.checklistItems = selectChecklistItem(this.checklistItems, label, disabled);
  }
}

class ChecklistStateDrugs {
  @observable checklistItems: IChecklist.ChecklistItem[] = checklistItemsDrugs;

  @action selectChecklistItem = (label: string, disabled: boolean) => { 
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

const Checkbox = ({ bool }: { bool: boolean }) => (
  bool ? (
    <div className="checkbox checkbox__checked" />
  ) : (
    <div className="checkbox" />
  )
);

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

interface ChecklistItemProps {
    id: string;
    label: string;
    selected: boolean;
    disabled: boolean;

    annotation?: string;
    onClick: () => any;
}

export class ChecklistItem extends React.Component<ChecklistItemProps, { onMouseDown: boolean }> {

  static propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    annotation: PropTypes.string,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  };

  constructor(props: ChecklistItemProps) {
    super(props);
    this.state = { onMouseDown: false };
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }
  
  onMouseUp(event: React.MouseEvent<HTMLLIElement>, disabled: boolean) {
    if (!disabled) {
      this.setState({
        onMouseDown: false,
      });  
    }
  }

  onMouseDown(event: React.MouseEvent<HTMLLIElement>, disabled: boolean) {
    if (!disabled) {
      this.setState({
        onMouseDown: true,
      });  
    }
  }

  render() {
    const { label, annotation, disabled, selected, id, onClick } = this.props;

    return (
      <li 
        id={id}      
        className={`checkbox__item checkbox__item__onclick__${this.state.onMouseDown} checkbox__item__disabled__${disabled}`} 
        onClick={() => onClick()}
        onMouseDown={(event) => this.onMouseDown(event, disabled)}
        onMouseUp={(event) => this.onMouseUp(event, disabled)}
      >
        <Checkbox bool={selected}/><p className="text">{label}</p>
        
        {annotation ? <span className="annotation">{annotation}</span> : null}
      </li>  
    );
  }

}

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

interface ChecklistProps {
  checklistItems: IChecklist.ChecklistItem[];
  selectChecklistItem: (label: string, disabled: boolean) => void;
}

@observer
class Checklist extends React.Component<ChecklistProps, {}> {

  render() {
    return (
      <ul className="checkbox__list">
        {this.props.checklistItems.map(
          (checklistItem: IChecklist.ChecklistItem) => (
            <ChecklistItem 
              key={checklistItem.id}
              id={checklistItem.id}
              label={checklistItem.label}
              annotation={checklistItem.annotation}
              disabled={checklistItem.disabled}
              selected={checklistItem.selected}
              onClick={() => this.props.selectChecklistItem(checklistItem.label, checklistItem.disabled)}
            />
          )
        )
        }
      </ul>  
    );
  }

  static propTypes = {
    store: PropTypes.shape({
      checklistItems: mobxPropTypes.observableArray,
      selectChecklistItem: PropTypes.func,  
    }),
  }
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


interface ChecklistContainerState {
  store: ChecklistProps
}

export class ChecklistFullContainer extends React.Component<{}, ChecklistContainerState> {
  
  constructor(props: {}) {
    super(props);
    this.state = {
      store: new ChecklistStateFull()
    }
  }

  render() {
    return (
      <Checklist
        checklistItems={this.state.store.checklistItems}
        selectChecklistItem={this.state.store.selectChecklistItem}
      /> 
    )
  }
}

export class ChecklistPartialContainer extends React.Component<{}, ChecklistContainerState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      store: new ChecklistStatePartial()
    }
  }

  render() {
    return (
      <Checklist 
        checklistItems={this.state.store.checklistItems}
        selectChecklistItem={this.state.store.selectChecklistItem}
      /> 
    )
  }
}

export class ChecklistItemAnnotation extends React.Component<{}, ChecklistContainerState> {
    
  constructor(props: {}) {
    super(props);
    this.state = {
      store: new ChecklistStateDrugs()
    }
  }

  render() {
    return (
      <Checklist 
        checklistItems={this.state.store.checklistItems}
        selectChecklistItem={this.state.store.selectChecklistItem}
      /> 
    )
  }
}


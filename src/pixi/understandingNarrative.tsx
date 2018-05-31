// import * as ReactDOM from 'react-dom';
// import * as React from 'react';
// import { ChecklistFullContainer, ChecklistPartialContainer, ChecklistItemAnnotation } from './react/Checklist';
import { createNarrativeGraph } from './helpers/narrative';
// import { createCube, createCrazyCube } from '../three/three';
import * as REDUX_NARRATIVE from './helpers/reduxNarrative';


createNarrativeGraph("narratives", REDUX_NARRATIVE.normalNarrative);
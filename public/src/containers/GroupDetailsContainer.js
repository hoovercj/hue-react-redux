import GroupDetails from '../components/GroupDetails.js';
import * as actionTypes from '../actionTypes/actionTypes';
import { setGroupStateStart, setGroupStateSuccess, setGroupStateFailure } from '../actionCreators/groups'
import { connect } from 'react-redux';

function mapStateToProps(globalState, ownProps) {
  return { group: globalState.lights.groupsList.groups[ownProps.id], groupId: ownProps.id };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
     updateGroup: (oldState, newState) => {
        dispatch(setGroupStateStart(ownProps.id, newState))
         .then((data) => {
           !data.error ?
             dispatch(setGroupStateSuccess()) :
             dispatch(setGroupStateFailure(ownProps.id, oldState));
         });
     },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);

import { connect } from 'react-redux'
import { getLightsStart, getLightsSuccess, getLightsFailure } from '../actionCreators/lights';
import { getGroupsStart, getGroupsSuccess, getGroupsFailure } from '../actionCreators/groups';

// import LightsList from '../components/LightsList';
import GroupsList from '../components/GroupsList';

const getLightsStartHelper = (dispatch) => {
  return dispatch(getLightsStart()).then((response) => {
    if (!response.error) { 
      dispatch(getLightsSuccess(response.payload)) 
    } else { 
      dispatch(getLightsFailure(response.payload));
      reject(response.payload);
    }
  });
}

const getGroupsStartHelper = (dispatch) => {
  return dispatch(getGroupsStart()).then((response) => {
    if (!response.error) {
      let rooms = {};
      Object.keys(response.payload.data).forEach((key) => {
        if (response.payload.data[key].type.toLowerCase() !== "room") {
          delete response.payload.data[key];
        }
      });
      dispatch(getGroupsSuccess(response.payload))
    } else {
      dispatch(getGroupsFailure(response.payload));
      reject(response.payload);
    }
  })
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getLightsStart: () => {
//       dispatch(getLightsStart()).then((response) => {
//         if (!response.error) { 
//           dispatch(getLightsSuccess(response.payload)) 
//         } else { 
//           dispatch(getLightsFailure(response.payload));
//         }
//       });
//     }
//   }
// }

const mapStateToProps = (state) => {
  return { 
    lightsList: state.lights.lightsList,
    groupsList: state.lights.groupsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLightsAndGroups: () => {
      getLightsStartHelper(dispatch).then(() => {
        getGroupsStartHelper(dispatch);
      });
    }
  }
}

const GroupsListContainer = connect(mapStateToProps, mapDispatchToProps)(GroupsList)

export default GroupsListContainer

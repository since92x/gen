import http from '@/common/request';
import { arrToTree, uuid } from '../utils/utils.js';
import _ from 'lodash';
const initState = {
  data: {
    list: [],
    treeData: [],
    pagination: {}
  },
  info: {
    id: '',
    pid: '',
    dependent: 1,
    template_id: '',
    name: '',
    label: '',
    desc: '',
    template: '',
    extra_field: []
  }
};

export default {
  namespace: 'component',

  state: _.cloneDeep(initState),

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(http.componentList, payload);
      response.data.list.forEach(item => {
        item.value = '' + item.name;
        item.key = uuid();
        item.title = item.label || item.name;
      });

      response.data.treeData = arrToTree(response.data.list, 'id', 'pid', '0');
      yield put({
        type: 'save',
        payload: response.data
      });
    },
    *info({ payload }, { call, put }) {
      yield put({
        type: 'reset',
        payload: {
          type: 'info'
        }
      });
      if (payload.id == 0) {
        return;
      }
      const response = yield call(http.componentInfo, payload);

      yield put({
        type: 'saveInfo',
        payload: response.data
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(http.componentAdd, payload, {
        method: 'post'
      });
      yield put({
        type: 'save',
        payload: response.data
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(http.componentRemove, payload, {
        method: 'post'
      });
      yield put({
        type: 'removeItems',
        payload: payload
      });

      if (callback) callback();
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload
      };
    },
    saveInfo(state, action) {
      return {
        ...state,
        info: action.payload
      };
    },
    removeItems(state, action) {
      const data = state.data;
      data.list = data.list.filter(item => action.payload.id.indexOf(item.id) == -1);
      return {
        ...state,
        data: data
      };
    },
    reset(state, action) {
      const type = action.payload.type;
      if (type == 'list') {
        return {
          ...state,
          data: _.cloneDeep(initState.data)
        };
      } else if (type == 'info') {
        return {
          ...state,
          info: _.cloneDeep(initState.info)
        };
      } else {
        return {
          ...initState
        };
      }
    }
  }
};

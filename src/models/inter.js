import http from '@/common/request';
import _ from 'lodash';
const initState = {
  data: {
    list: [],
    pagination: {}
  },
  info: {
    id: '',
    inter_app_id: '',
    name: '',
    label: '',
    cate_id: '',

    url: '',
    method: '',
    comments: `/*
 template|form: {}
*/
{}
              `,
    header: `{

}`,
    req: `
/*
  ui|form: {}
*/
{
  /*
    label: "名称",
    ui|input: {}
  */
  name: daycool
}`,
    res_header: `{

}`,
    res: `
{
  code: 200
  msg: 成功
  data: {

  }
}`
  }
};

export default {
  namespace: 'inter',

  state: _.cloneDeep(initState),

  effects: {
    *list({ payload, callback }, { call, put }) {
      const response = yield call(http.interList, payload);
      yield put({
        type: 'save',
        payload: response.data
      });
      if (callback) callback(response);
    },
    *info({ payload, callback }, { call, put }) {
      yield put({
        type: 'reset',
        payload: {
          type: 'info'
        }
      });
      if (payload.id == 0) {
        return;
      }
      const response = yield call(http.interInfo, payload);
      yield put({
        type: 'saveInfo',
        payload: response.data
      });
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(http.interAdd, payload, { method: 'post' });
      yield put({
        type: 'save',
        payload: response.data
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(http.interRemove, payload, {
        method: 'post'
      });
      yield put({
        type: 'removeItems',
        payload: payload
      });

      if (callback) callback(response);
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

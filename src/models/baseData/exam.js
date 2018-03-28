/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { queryExam, removeExam, addExam, updateExam, queryUnitSelect, viewExam } from '../../services/api';

export default {
  namespace: 'exam',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    checkData: {},
    loading: true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryExam, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('考试查询表单前端传值：', payload);
      console.log('考试查询数据后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload }, { call, put }) {
      const response = yield call(viewExam, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.dataMain.dataExamVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('exam详情单条记录前端传值：', payload);
      console.log('exam详情单条记录后端响应：', response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addExam, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('考试列表添加前端传值：', payload);
      console.log('考试列表添加后端响应：', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateExam, payload);
      console.log('考试列表修改前端传值：', payload);
      console.log('考试列表修改后端响应：', response);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeExam, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('考试删除前端传值：', payload);
      console.log('考试删除后端响应：', response);
      if (callback) callback();
    },
    *unitSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryUnitSelect, payload);
      console.log('考试单位下拉菜单前端传值：', payload);
      console.log('考试单位下拉菜单后端响应：', response);
      yield put({
        type: 'unitSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    viewSave(state, action) {
      return {
        ...state,
        viewData: action.payload,
      };
    },
    unitSelectSave(state, action) {
      return {
        ...state,
        unitSelectData: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};

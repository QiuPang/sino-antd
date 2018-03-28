/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { viewUkeyProgram, queryUkeyProgram, removeUkeyProgram, addUkeyProgram, updateUkeyProgram } from '../../services/machineApi';

export default {
  namespace: 'ukeyProgram',

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
      const response = yield call(queryUkeyProgram, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('UkeyProgram查询前端传值：', payload);
      console.log('UkeyProgram查询后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload, callback }, { call, put }) {
      const response = yield call(viewUkeyProgram, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.dataMain.machineUkeyProgramVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('UkeyProgram详情单条记录前端传值：', payload);
      console.log('UkeyProgram详情单条记录后端响应：', response);
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addUkeyProgram, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('UkeyProgram列表添加前端传值：', payload);
      console.log('UkeyProgram列表添加后端响应：', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateUkeyProgram, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('UkeyProgram列表修改前端传值：', payload);
      console.log('UkeyProgram列表修改后端响应：', response);
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUkeyProgram, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('UkeyProgram删除前端传值：', payload);
      console.log('UkeyProgram删除后端响应：', response);

      if (callback) callback();
    },
    *examPlanNameSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryExamPlanNameSelect, payload);
      console.log('UkeyProgram考试计划下拉菜单前端传值：', payload);
      console.log('UkeyProgram考试计划下拉菜单后端响应：', response);
      yield put({
        type: 'examPlanNameSelectSave',
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
    examPlanNameSelectSave(state, action) {
      return {
        ...state,
        examPlanNameSelectData: action.payload,
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

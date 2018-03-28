/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { viewUkeyUse, queryUkeyUse, removeUkeyUse, addUkeyUse, updateUkeyUse } from '../../services/machineApi';
import { queryExamPlanNameSelect, queryMachineSelect, queryUkeyProgramSelect, queryExamDataSelect } from '../../services/api';

export default {
  namespace: 'ukeyUse',

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
      const response = yield call(queryUkeyUse, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('UkeyUse查询前端传值：', payload);
      console.log('UkeyUse查询后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload, callback }, { call, put }) {
      const response = yield call(viewUkeyUse, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.dataMain.dataUkeyUseVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('UkeyUse详情单条记录前端传值：', payload);
      console.log('UkeyUse详情单条记录后端响应：', response);
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addUkeyUse, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('UkeyUse列表添加前端传值：', payload);
      console.log('UkeyUse列表添加后端响应：', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateUkeyUse, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('UkeyUse列表修改前端传值：', payload);
      console.log('UkeyUse列表修改后端响应：', response);
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUkeyUse, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('UkeyUse删除前端传值：', payload);
      console.log('UkeyUse删除后端响应：', response);

      if (callback) callback();
    },
    *examPlanNameSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryExamPlanNameSelect, payload);
      console.log('UkeyUse考试计划下拉菜单前端传值：', payload);
      console.log('UkeyUse考试计划下拉菜单后端响应：', response);
      yield put({
        type: 'examPlanNameSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
    *ukeyProgramSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryUkeyProgramSelect, payload);
      console.log('UkeyUse软件包下拉菜单前端传值：', payload);
      console.log('UkeyUse软件包下拉菜单后端响应：', response);
      yield put({
        type: 'ukeyProgramSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
    *machineSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryMachineSelect, payload);
      console.log('UkeyUse硬件设备下拉菜单前端传值：', payload);
      console.log('UkeyUse硬件设备下拉菜单后端响应：', response);
      yield put({
        type: 'machineSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
    *examDataSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryExamDataSelect, payload);
      console.log('UkeyUse硬件设备下拉菜单前端传值：', payload);
      console.log('UkeyUse硬件设备下拉菜单后端响应：', response);
      yield put({
        type: 'machineSelectSave',
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
    ukeyProgramSelectSave(state, action) {
      return {
        ...state,
        ukeyProgramSelectData: action.payload,
      };
    },
    machineSelectSave(state, action) {
      return {
        ...state,
        machineSelectData: action.payload,
      };
    },
    examDataSelectSave(state, action) {
      return {
        ...state,
        examDataSelectData: action.payload,
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

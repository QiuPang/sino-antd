/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { queryBillPlace, queryBill } from '../../services/machineApi';
import { queryAreaSelect, queryExamPlanNameSelect } from '../../services/api';

export default {
  namespace: 'bill',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    billPlaceData: {
      list: [],
      pagination: {},
    },
    checkData: {},
    loading: true,
  },

  effects: {
    *fetchBillPlace({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryBillPlace, payload);
      if (response.status === '1') {
        yield put({
          type: 'saveBillPlace',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('BillPlace查询前端传值：', payload);
      console.log('BillPlace查询后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryBill, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('Bill查询前端传值：', payload);
      console.log('Bill查询后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *examPlanNameSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryExamPlanNameSelect, payload);
      console.log('BillPlace考试计划下拉菜单前端传值：', payload);
      console.log('BillPlace考试计划下拉菜单后端响应：', response);
      yield put({
        type: 'examPlanNameSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
    *areaSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryAreaSelect, payload);
      console.log('BillPlace行政区下拉菜单前端传值：', payload);
      console.log('BillPlace行政区下拉菜单后端响应：', response);
      yield put({
        type: 'areaSelectSave',
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
    saveBillPlace(state, action) {
      return {
        ...state,
        billPlaceData: action.payload,
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
    areaSelectSave(state, action) {
      return {
        ...state,
        areaSelectData: action.payload,
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

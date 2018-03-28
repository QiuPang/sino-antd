/* eslint-disable linebreak-style,no-param-reassign */
import { message } from 'antd';
import { viewExamData, queryExamData, removeExamData, addExamData, updateExamData, queryAreaSelect, queryExamPlanNameSelect } from '../../services/api';

export default {
  namespace: 'examData',

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
      const response = yield call(queryExamData, payload);
      if (response.status === '1') {
        yield put({
          type: 'save',
          payload: response.dataMain,
        });
      } else {
        message.error(response.msg);
      }
      console.log('ExamData查询前端传值：', payload);
      console.log('ExamData查询后端响应：', response);

      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *view({ payload, callback }, { call, put }) {
      const response = yield call(viewExamData, payload);
      if (response.status === '1') {
        yield put({
          type: 'viewSave',
          payload: response.dataMain.dataExamDataVo,
        });
      } else {
        message.error(response.msg);
      }
      console.log('ExamData详情单条记录前端传值：', payload);
      console.log('ExamData详情单条记录后端响应：', response);
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addExamData, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('ExamData列表添加前端传值：', payload);
      console.log('ExamData列表添加后端响应：', response);
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateExamData, payload);
      if (response.status === '1') {
        message.success('添加成功');
      } else {
        message.error(response.msg);
      }
      console.log('ExamData列表修改前端传值：', payload);
      console.log('ExamData列表修改后端响应：', response);
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeExamData, payload);
      if (response.status === '1') {
        message.success('删除成功');
      } else {
        message.error(response.msg);
      }
      console.log('ExamData删除前端传值：', payload);
      console.log('ExamData删除后端响应：', response);

      if (callback) callback();
    },
    *examPlanNameSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryExamPlanNameSelect, payload);
      console.log('ExamData考试计划下拉菜单前端传值：', payload);
      console.log('ExamData考试计划下拉菜单后端响应：', response);
      yield put({
        type: 'examPlanNameSelectSave',
        payload: response,
      });
      if (callback) callback();
    },
    *areaSelect({ payload, callback }, { call, put }) {
      const response = yield call(queryAreaSelect, payload);
      console.log('ExamData行政区下拉菜单前端传值：', payload);
      console.log('ExamData行政区下拉菜单后端响应：', response);
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

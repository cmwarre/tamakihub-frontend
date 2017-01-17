import * as types from './action-types';

export function getJobsSuccess(jobs){
    return {
        type: types.GET_JOBS_SUCCESS,
        jobs
    }
}

export function getJobSuccess(job){
    return {
        type: types.GET_JOB_SUCCESS,
        job
    }
}

export function deleteJobSuccess(jobs){
    return {
        type: types.DELETE_JOBS_SUCCESS,
        jobs
    }
}

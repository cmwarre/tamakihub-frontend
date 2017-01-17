import * as types from './action-types';

export function getSkillsSuccess(skills) {
    return {
        type: types.GET_SKILLS_SUCCESS,
        skills
    };
}

export function getSkillSuccess(skill){
    return {
        type: types.GET_SKILL_SUCCESS,
        skill
    };
}

export function deleteSkillSuccess(skillId){
    return {
      type: types.DELETE_SKILL_SUCCESS,
        skillId
    };
}

export function editSkillSuccess(skill){
    return {
        type: types.EDIT_SKILL_SUCCESS,
        skill
    };
}

export function addSkillSuccess(skill){
    return {
        type: types.ADD_SKILL_SUCCESS,
        skill
    };
}
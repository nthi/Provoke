import { assertTSConstructSignatureDeclaration } from "@babel/types";

const apiUrl = "https://localhost:5001";

export const getCurrentUserId = () => JSON.parse(localStorage.getItem('user')).id;

export const getAllPublishedDraftsByUser = () => {
    return fetch(`${apiUrl}/api/Draft/getpublished/${getCurrentUserId()}`)
    .then((res) => res.json())
};

export const getAllUnPublishedDraftsByUser = () => {
    return fetch(`${apiUrl}/api/Draft/getunpublished/${getCurrentUserId()}`)
    .then((res) => res.json())
};

export const addDraft = (singleDraft) => {
    return fetch(`${apiUrl}/api/Draft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleDraft),
    });
  };

  export const editDraft = (draft) => {
    return fetch(`${apiUrl}/api/Draft/${draft.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(draft)
    })
  };

  export const getDraftById = (id) => {
    return fetch(`${apiUrl}/api/Draft/getbyid/${id}`)
    .then((res) => res.json())
  };

  export const deleteDraft = (draftId) => {
    return fetch(`${apiUrl}/api/Draft/${draftId}`, {
      method: "DELETE"
    })
  }
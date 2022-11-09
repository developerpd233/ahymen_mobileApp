import { create } from "apisauce";

const api = create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

class ApiSauce {
    async post(url, payload) {
        const Header = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };
        const response = await api.post(url, payload, Header);
        return new Promise((resolve, reject) => {
            this.handlePromise(resolve, reject, response);
        });
    }

    // async put(url, payload) {
    //   const Header = {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //   };
    //   const response = await api.put(url, payload, Header);
    //   return new Promise((resolve, reject) => {
    //     this.handlePromise(resolve, reject, response);
    //   });
    // }
    async postWithToken(url, payload, token, isHandle = true, contentType) {
        const Header = {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await api.post(url, payload, Header);
        if (isHandle) {
            return new Promise((resolve, reject) => {
                this.handlePromise(resolve, reject, response);
            });
        } else {
            return response;
        }
    }
    async postWithFormDataToken(
        url,
        payload,
        token,
        isHandle = true,
        contentType
    ) {
        const Header = {
            headers: {
                // 'Content-Type': 'multipart/form-data;',

                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await api.post(url, payload, Header);
        if (isHandle) {
            return new Promise((resolve, reject) => {
                this.handlePromise(resolve, reject, response);
            });
        } else {
            return response;
        }
    }

    async getWithToken(url, token) {
        const Header = {
            headers: {
                // 'Content-Type': 'application/json',
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        console.log("firstfirstfirstfirstfirstfirstfirst", url, token);
        const response = await api.get(url, {}, Header);
        return new Promise((resolve, reject) => {
            this.handlePromise(resolve, reject, response);
        });
    }

    async deleteWithToken(url, token) {
        console.log(
            "🚀 ~ file: network.js ~ line 70 ~ ApiSauce ~ deleteWithToken ~ url",
            url
        );
        const Header = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await api.delete(url, {}, Header);
        return new Promise((resolve, reject) => {
            this.handlePromise(resolve, reject, response);
        });
    }

    async putWithToken(url, payload, token) {
        const Header = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await api.put(url, payload, Header);
        return new Promise((resolve, reject) => {
            this.handlePromise(resolve, reject, response);
        });
    }

    async patchWithToken(url, payload, token) {
        const Header = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await api.patch(url, payload, Header);
        return new Promise((resolve, reject) => {
            this.handlePromise(resolve, reject, response);
        });
    }

    //   async getWithTokenAndBody(url, payload, token) {
    //     const data = JSON.stringify(payload);
    //     const Header = {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         Authorization: `${token}`,
    //       },
    //       data,
    //     };

    //     const response = await api(url, Header, data);
    //     return new Promise((resolve, reject) => {
    //       this.handlePromise(resolve, reject, response);
    //     });
    //   }

    async getWithoutToken(url) {
        const Header = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };
        const response = await api.get(url, {}, Header);
        return new Promise((resolve, reject) => {
            this.handlePromise(resolve, reject, response);
        });
    }

    // handlePromise = (resolve, reject, response) => {
    //   if (
    //     response.ok &&
    //     response.originalError === null &&
    //     response.problem === null &&
    //     response.status === 201 &&
    //     response.data
    //   ) {
    //     resolve(response.data);
    //   } else  if (
    //     response.ok &&
    //     response.originalError === null &&
    //     response.problem === null &&
    //     response.status === 200 &&
    //     response.data
    //     ) {
    //     resolve(response.data);
    //   }else {
    //     if (
    //       !response.ok &&
    //       response.originalError &&
    //       response.problem &&
    //       response.status === 400 &&
    //       response.data &&
    //       response.data?.msg
    //     ) {
    //       reject(response.data.msg);
    //     } else if (
    //       !response.ok &&
    //       response.originalError &&
    //       response.problem === 'NETWORK_ERROR' &&
    //       response.status === null
    //     ) {
    //       reject(response.problem);
    //     } else if (
    //       !response.ok &&
    //       response.originalError &&
    //       response.problem === 'SERVER_ERROR' &&
    //       response.status === 500 &&
    //       response.data &&
    //       !response.data?.success &&
    //       response.data?.msg
    //     ) {
    //       reject(response.data?.msg);
    //     } else if (
    //       !response.ok &&
    //       response.originalError &&
    //       response.problem === 'SERVER_ERROR' &&
    //       response.status === 500 &&
    //       response.data
    //     ) {
    //       reject(response.problem);
    //     } else if (
    //       !response.ok &&
    //       response.originalError &&
    //       response.problem === 'SERVER_ERROR' &&
    //       response.status === 502 &&
    //       response.data
    //     ) {
    //       reject(response.problem);
    //     } else if (
    //       !response.ok &&
    //       response.originalError &&
    //       response.problem === 'SERVER_ERROR' &&
    //       response.status === 503 &&
    //       response.data
    //     ) {
    //       reject(response.problem);
    //     } else if (
    //       !response.ok &&
    //       response.originalError &&
    //       response.problem === 'CLIENT_ERROR' &&
    //       response.status === 404 &&
    //       response.data?.messages
    //     ) {
    //       reject(response.data?.messages);
    //     } else if (
    //       !response.ok &&
    //       response.originalError &&
    //       response.problem === 'CLIENT_ERROR' &&
    //       response.status === 422 &&
    //       response?.data &&
    //       // !response.data?.success &&
    //       response.data?.messages
    //     ) {
    //       reject(response.data?.messages);
    //     } else if (
    //       !response.ok &&
    //       response.originalError &&
    //       response.problem === 'CLIENT_ERROR' &&
    //       response.status === 422 &&
    //       response?.data &&
    //       // !response.data?.success &&
    //       response.data?.messages
    //     ) {
    //       reject(response.data?.messages);
    //     }
    //   }
    // };

    handlePromise = (resolve, reject, response) => {
        if (
            (response?.data?.success && response.status === 200) ||
            response.status === 201 ||
            response.originalError === null
        ) {
            resolve(response.data);
        } else {
            reject(response?.data);
        }
    };
}

export default new ApiSauce();

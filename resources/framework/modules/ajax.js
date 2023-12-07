function ajax(props) {
    props = {
        url: props.url,
        method: (props.method ?? 'get').toUpperCase(),
        data: props.data ?? {},
        success: props.success ?? (() => {
        }),
        error: props.error ?? (() => {
        }),
        beforeSend: props.beforeSend ?? (() => {
        }),
        contentType: props.contentType ?? 'application/x-www-form-urlencoded'
    };

    sendData = '';

    if (props.data) {
        var sendData = objToUrl(props.data);
    }

    props.beforeSend();
    const xhr = new XMLHttpRequest();
    props.url += props.method === 'POST' ? '' : '?' + sendData;
    xhr.open(props.method, props.url, true);
    xhr.setRequestHeader("Content-Type", props.contentType);

    xhr.send(sendData);

    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            let response = {statusCode: xhr.status, statusText: xhr.statusText};
            try {
                response.response = JSON.parse(xhr.responseText);
            } catch (e) {
                response.response = xhr.responseText;
            }

            if (this.status === 200) {
                props.success(response.response, response)
            } else {
                props.error(response.response, response)
            }
        }
    };
}

function objToUrl(data, parentKey = '') {
    const params = [];

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const paramKey = parentKey ? `${parentKey}[${key}]` : key;
            if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
                const nestedParams = objToUrl(data[key], paramKey);
                params.push(nestedParams);
            } else if (Array.isArray(data[key])) {
                data[key].forEach((item, index) => {
                    if (typeof item === 'object' && !Array.isArray(item)) {
                        const nestedParams = objToUrl(item, `${paramKey}[${index}]`);
                        params.push(nestedParams);
                    } else {
                        params.push(`${paramKey}[]=${encodeURIComponent(item)}`);
                    }
                });
            } else {
                params.push(`${paramKey}=${encodeURIComponent(data[key])}`);
            }
        }
    }

    return params.join('&');
}
import {TABLE_MAPPING} from "./common";
import {find} from "lodash";

export const getTitleTable = (model, arrayTitle, arrayItemRemove = []) => {
    let newArrayTitle = model.concat(arrayTitle);
    if (arrayItemRemove.length > 0) {
        let titleTable = newArrayTitle;
        arrayItemRemove.map(i => {
            titleTable = titleTable.filter((ele) => ele !== i);
        });
        return titleTable;
    } else {
        return newArrayTitle;
    }
};

export const columnsTable = (props) => {
    let obj = [];
    const titleGenerate = (params) => {
        if (props.children) {
            let title = props.tag.split('.');
            let newTitle = "";
            title.map((i, k) => {
                if (k === 0) {
                    newTitle = TABLE_MAPPING[i.toUpperCase()]
                } else {
                    newTitle = newTitle[i]
                }
            });
            return newTitle[params];
        } else {
            return TABLE_MAPPING[(props.tag).toUpperCase()][params];
        }
    };
    if (Object.keys(props).length > 0) {
        if (props.titleTable.length > 0) {
            props.titleTable.map((i, k) => {
                if (props.component && props.component[i]) {
                    obj.push({
                        label: titleGenerate(i),
                        // title: i18n.t(`item.${props.tag}.${i}`),
                        dataIndex: i,
                        key: k,
                        ...props.component[i],
                    })
                } else {
                    obj.push({
                        label: titleGenerate(i),
                        // title: i18n.t(`item.${props.tag}.${i}`),
                        dataIndex: i,
                        key: k,
                    })
                }
            });
        }
    }
    return obj;
};

export const getDataSource = (data, model) => {
    const newData = (data || []).map(data => {
        data.children = undefined;
        return data
    });
    let dataSource = [];
    let listItemData = {};
    model.map(i => listItemData = {...listItemData, [i]: ""});
    if (newData.length > 0) {
        newData.map((i, k) => {
            let itemData;
            Object.keys(listItemData).map(i2 => {
                itemData = {...itemData, [i2]: i[i2]};
            });
            dataSource.push(itemData)
        })
    }
    return dataSource;
};

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const handleError = (result, callback) => {
    if ((result?.data?.status || "").toLowerCase() === "success") {
        return result?.data.data
    } else if ((result?.data?.status || "").toLowerCase() === "error") {
        let checkErrors = find(result?.data?.errors, {code: 401});
        if (Object.keys(checkErrors || {}).length > 0) {
            localStorage.removeItem("tk");
            window.location = "/login"
        } else {
            return result?.data
        }
    } else {
        throw result
    }
}

export const handleFormError = (form, validationFields, callback) => {
    let errors = [];
    Object.keys(validationFields).map(i => {
        if (!form.get(i)) {
            errors.push({field: i, message: validationFields[i]})
        }
    })
    if (errors.length > 0) {
        throw errors
    } else {
        return []
    }
}

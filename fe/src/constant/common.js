export const TABLE_MAPPING = {
    USERS: {
        id: "Order",
        email: "Email",
        username: "Username",
        fullname: "Fullname",
        created_at: "Create Date",
        updated_at: "Update Date",
        action: "Action"
    },
    ARTICLES: {
        title: "Title",
        body: "Body",
        favourite_count: "Favourite Count",
        created_at: "Create Date",
        updated_at: "Update Date",
        id: "Order",
        action: "Action"
    },
}

export const URL_API = {
    LOGIN: "http://localhost:3111/api/login",
    USERS_LIST: "http://localhost:3111/api/users",
    USERS_DELETE: "http://localhost:3111/api/users",
    USERS_CREATE: "http://localhost:3111/api/users",

    ARTICLES_LIST: "http://localhost:3111/api/articles",
    ARTICLES_CREATE: "http://localhost:3111/api/articles",
    ARTICLES_ITEM: "http://localhost:3111/api/articles",
    ARTICLES_UPDATE: "http://localhost:3111/api/articles",
    ARTICLES_DELETE: "http://localhost:3111/api/articles",
}

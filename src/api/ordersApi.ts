
const API_URL =
    "https://back-end-git-main-hagers-projects-df0172bd.vercel.app";

// ===============================
// Create Order Data
// ===============================

export type CreateOrderData = {
    serviceType: string;
    scheduledAt: string;
    problemDescription: string;
    images?: File[];
    voiceNote?: File;
};

// ===============================
// Customer
// ===============================

export type Customer = {
    id: string;
    fullName: string;
    phone: string;
};

// ===============================
// Order
// ===============================

export type Order = {
    id: string;
    customerId: string;
    technicianId: string | null;
    companyId: string | null;

    serviceType: string;
    scheduledAt: string;
    problemDescription: string;

    images: string[];
    voiceNoteUrl: string | null;

    status: string;
    rejectionReason: string | null;

    createdAt: string;
    updatedAt: string;

    customer?: Customer;
    technician?: unknown | null;
    company?: unknown | null;
};

// ===============================
// Get Orders Response
// ===============================

export type GetMyOrdersResponse = {
    message: string;
    orders: Order[];
};

// ===============================
// Get Order By ID Response
// ===============================

export type GetOrderByIdResponse = {
    message: string;
    order: Order;
};

// ===============================
// Update Order Status
// ===============================

export type UpdateOrderStatusData = {
    status: "ACCEPTED" | "REJECTED";
    rejectionReason?: string;
};

export type UpdateOrderStatusResponse = {
    message: string;
    order?: Order;
};

// ===============================
// POST /api/orders
// Create Order
// ===============================

export const createOrder = async (
    data: CreateOrderData
) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("يجب تسجيل الدخول أولاً");
    }

    const formData = new FormData();

    formData.append(
        "serviceType",
        data.serviceType
    );

    formData.append(
        "scheduledAt",
        data.scheduledAt
    );

    formData.append(
        "problemDescription",
        data.problemDescription
    );

    // Images
    if (
        data.images &&
        data.images.length > 0
    ) {
        data.images.forEach((image) => {
            formData.append("images", image);
        });
    }

    // Voice note
    if (data.voiceNote) {
        formData.append(
            "voiceNote",
            data.voiceNote
        );
    }

    const response = await fetch(
        `${API_URL}/api/orders`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "فشل إنشاء الطلب"
        );
    }

    return result;
};

// ===============================
// GET /api/orders/me
// Get My Orders
// ===============================

export const getMyOrders =
    async (): Promise<GetMyOrdersResponse> => {
        const token =
            localStorage.getItem("token");

        if (!token) {
            throw new Error(
                "يجب تسجيل الدخول أولاً"
            );
        }

        const response = await fetch(
            `${API_URL}/api/orders/me`,
            {
                method: "GET",
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const result: GetMyOrdersResponse =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "فشل جلب الطلبات"
            );
        }

        return result;
    };

// ===============================
// GET /api/orders/:id
// Get Order Details
// ===============================

export const getOrderById = async (
    id: string
): Promise<GetOrderByIdResponse> => {
    const token =
        localStorage.getItem("token");

    if (!token) {
        throw new Error(
            "يجب تسجيل الدخول أولاً"
        );
    }

    const response = await fetch(
        `${API_URL}/api/orders/${id}`,
        {
            method: "GET",
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result: GetOrderByIdResponse =
        await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "فشل جلب تفاصيل الطلب"
        );
    }

    return result;
};

// ===============================
// GET /api/orders/available
// Get Available Orders
// ===============================

export const getAvailableOrders =
    async (): Promise<GetMyOrdersResponse> => {
        const token =
            localStorage.getItem("token");

        if (!token) {
            throw new Error(
                "يجب تسجيل الدخول أولاً"
            );
        }

        const response = await fetch(
            `${API_URL}/api/orders/available`,
            {
                method: "GET",
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const result: GetMyOrdersResponse =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "فشل جلب الطلبات المتاحة"
            );
        }

        return result;
    };

// ===============================
// PATCH /api/orders/:id/status
// Accept / Reject Order
// ===============================

export const updateOrderStatus = async (
    id: string,
    data: UpdateOrderStatusData
): Promise<UpdateOrderStatusResponse> => {
    const token =
        localStorage.getItem("token");

    if (!token) {
        throw new Error(
            "يجب تسجيل الدخول أولاً"
        );
    }

    // Validate Order ID
    if (!id) {
        throw new Error(
            "رقم الطلب غير موجود"
        );
    }

    // Validate status
    if (
        data.status !== "ACCEPTED" &&
        data.status !== "REJECTED"
    ) {
        throw new Error(
            "حالة الطلب غير صحيحة"
        );
    }

    // Rejection reason is required when rejecting
    if (
        data.status === "REJECTED" &&
        !data.rejectionReason?.trim()
    ) {
        throw new Error(
            "يجب كتابة سبب رفض الطلب"
        );
    }

    const body: UpdateOrderStatusData = {
        status: data.status,
    };

    // Send rejection reason only when rejecting
    if (
        data.status === "REJECTED" &&
        data.rejectionReason
    ) {
        body.rejectionReason =
            data.rejectionReason;
    }

    console.log(
        "Updating Order Status:",
        {
            orderId: id,
            status: body.status,
        }
    );

    const response = await fetch(
        `${API_URL}/api/orders/${id}/status`,
        {
            method: "PATCH",
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        }
    );

    const result: UpdateOrderStatusResponse =
        await response.json();

    console.log(
        "Update Order Status Response:",
        {
            status: response.status,
            result,
        }
    );

    if (!response.ok) {
        throw new Error(
            result.message ||
            "فشل تحديث حالة الطلب"
        );
    }

    return result;
};

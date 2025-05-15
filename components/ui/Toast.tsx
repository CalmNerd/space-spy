"use client";

import { toast } from "react-hot-toast";

interface ToastProps {
    type: "success" | "error" | "info";
    message: string;
}

export function showToast({ type, message }: ToastProps) {
    switch (type) {
        case "success":
            toast.success(message, {
                style: {
                    background: "#0B1A2F",
                    color: "#05DF72",
                },
            });
            break;
        case "error":
            toast.error(message, {
                style: {
                    background: "#0B1A2F",
                    color: "#FF5A5F",
                },
            });
            break;
        case "info":
            toast(message, {
                style: {
                    background: "#0B1A2F",
                    color: "#3772FE",
                },
            });
            break;
        default:
            toast(message);
    }
}

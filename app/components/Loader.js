// app/components/Loader.js
export default function Loader({
    type = "spinner",
    size = 24,
    count = 3,
}) {
    const shimmer =
        "relative overflow-hidden bg-gray-200 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent";

    if (type === "spinner") {
        return (
            <div className="flex justify-center items-center">
                <div
                    className={`animate-spin rounded-full`}
                    style={{
                        height: size,
                        width: size,
                        border: "3px solid #ccc",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                    }}
                />
            </div>
        );
    }

    if (type === "list") {
        return (
            <div className="space-y-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg bg-muted space-y-2">
                        <div className={`h-4 w-1/3 rounded ${shimmer}`}></div>
                        <div className={`h-3 w-2/3 rounded ${shimmer}`}></div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === "details") {
        return (
            <div className="p-4 space-y-3">
                <div className={`h-5 w-1/2 rounded ${shimmer}`}></div>
                <div className={`h-3 w-full rounded ${shimmer}`}></div>
                <div className={`h-3 w-5/6 rounded ${shimmer}`}></div>
                <div className={`h-3 w-2/3 rounded ${shimmer}`}></div>
            </div>
        );
    }

    if (type === "replies") {
        return (
            <div className="space-y-3">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="p-3 border rounded-lg bg-muted space-y-2">
                        <div className={`h-3 w-1/4 rounded ${shimmer}`}></div>
                        <div className={`h-3 w-3/4 rounded ${shimmer}`}></div>
                    </div>
                ))}
            </div>
        );
    }

    return null;
}

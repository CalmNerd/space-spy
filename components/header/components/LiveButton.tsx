import Image from "next/image";

export function LiveButton() {
    return (
        <div className="flex items-center space-x-1 rounded-full live-button px-3 py-1.5 text-sm">
            <div className="relative h-4 w-4">
                <Image
                    src="/icons/playIcon.svg"
                    alt="live"
                    fill
                />
            </div>
            <span>Live</span>
        </div>
    );
}
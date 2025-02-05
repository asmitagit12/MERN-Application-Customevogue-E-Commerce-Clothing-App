import { useEffect, useState } from "react"

export const useMount = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (!mounted) {
            setMounted(true)
        }
    }, [mounted]);

    return mounted;
}

export default class ValidationProvider {
    static min(value: string, total = 3): boolean {
        return value.length >= total;
    }

    static image(value: string): boolean {
        try {
            const url = new URL(value);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                return false;
            }
            // Optimizar validación para aceptar solo imágenes en png ó jpg
            const regex = new RegExp(/(\.png|\.jpg)$/i);
            return regex.test(url.pathname);
        } catch (e) {
            return false;
        }
    }

    static number(value: string | number): boolean {
        const regex = new RegExp(/[0-9]+/i);

        if (typeof value === 'number') {
            value = value.toString();
        }

        if (!regex.test(value)) {
            return false;
        }

        const number = parseInt(value)
        return number >= 0 && number <= 100;
    }
}

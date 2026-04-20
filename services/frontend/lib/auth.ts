import { cookies } from 'next/headers'
import * as jwt from 'jsonwebtoken'

export async function verifyJwtFromCookie() : Promise<jwt.JwtPayload | null> {

    // Vérifie si le JWT en cookie est valide
    const cookieStore = await cookies();
    const token = await cookieStore.get('jwt')?.value
    if (!token) {
        return null;
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        return payload;
    } catch {
        return null;
    }
}

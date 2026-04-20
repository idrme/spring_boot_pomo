import { Card } from "./ui/card";

export function BadLogin() {
    return (
        <div className="mb-10">
                <Card className="w-full max-w-sm text-red-600">
                    <h4>Error</h4>
                    <p className="text-white">
                        Wrong username or password.
                    </p>

                </Card>
        </div>
    )
}
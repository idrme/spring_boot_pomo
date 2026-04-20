import { Card } from "./ui/card";

export function BadInputsRegister() {
    return (
        <div className="mb-10">
                <Card className="w-full max-w-sm text-red-600">
                    <h4>Error</h4>
                    <p className="text-white">
                    Your password must contain at least 8 characters. <br/>
                    Your email must be valid.
                    </p>

                </Card>
        </div>
    )
}
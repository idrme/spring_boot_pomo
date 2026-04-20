import { Card } from "./ui/card";

export function SentSuccessfully() {
    return (
        <div className="mb-10">
                <Card className="w-full max-w-sm text-white">
                    <h4>Success !</h4>
                    <p className="text-white">
                        Your account has been modified.
                    </p>

                </Card>
        </div>
    )
}
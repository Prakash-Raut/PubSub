type Callback = (data: any) => void;

class PubSub {
    private subscribers: { [event: string]: Callback[] };

    constructor() {
        this.subscribers = {};
    }

    subscribe(event: string, callback: Callback): () => void {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);

        return () => this.unsubscribe(event, callback);
    }

    publish(event: string, data: any): void {
        if (!this.subscribers[event]) {
            return;
        }
        this.subscribers[event].forEach((callback) => callback(data));
    }

    unsubscribe(event: string, callback: Callback): void {
        if (!this.subscribers[event]) {
            return;
        }
        this.subscribers[event] = this.subscribers[event].filter(
            (cb) => cb !== callback
        );
    }
}

const pb = new PubSub();

pb.subscribe("Nike Airforce", (data) =>
    console.log("Subscriber 1 of Nike Airforce", data)
);

pb.subscribe("Nike Airforce", (data) =>
    console.log("Subscriber 2 of Nike Airforce", data)
);

pb.subscribe("Jordan", (data) => console.log("Subscriber 1 of Jordan", data));

pb.publish("Nike Airforce", { shoeName: "Nike Airforce" });

pb.publish("Jordan", { shoeName: "Nike Air Jordan Series 10" });
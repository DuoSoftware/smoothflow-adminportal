import AwsIot from 'aws-iot-device-sdk';
import Config from '../../config';

class IoTClient {
    constructor(options = {}) {
        if (this.client) {
            return this;
        }

        this.client = null;

        this.init(options);
    }

    init(options) {
        const clientId = `smoothflow-notification-${Math.floor((Math.random() * 1000000) + 1)}`;

        this.client = AwsIot.device({
            region: options.region || Config.awsRegion,

            // AWS IoT Host endpoint
            host: options.host || Config.awsIotHost,

            // clientId created earlier
            clientId: options.clientId || clientId,

            // Connect via secure WebSocket
            protocol: options.protocol || 'wss',

            // Set the maximum reconnect time to 500ms
            baseReconnectTimeMs: options.baseReconnectTimeMs || 250,
            maximumReconnectTimeMs: options.maximumReconnectTimeMs || 500,

            // Enable console debugging information
            debug: (typeof options.debug === 'undefined') ? true : options.debug,

            // AWS access key ID, secret key and session token must be
            // initialized with empty strings
            accessKeyId: options.accessKeyId || '',
            secretKey: options.secretKey || '',
            sessionToken: options.sessionToken || '',

            // Let redux handle subscriptions
            autoResubscribe: (typeof options.debug === 'undefined') ? false : options.autoResubscribe,
        });
    }

    onConnect(callback) {
        if (this.client) {
            this.client.on('connect', callback);
            return this;
        }
    }

    onConnectionError(callback) {
        if (this.client) {
            this.client.on('error', callback);
            return this;
        }
    }


    onMessageReceived(callback) {
        if (this.client) {
            this.client.on('message', (topic, message) => {
                callback(topic, message.toString());
                return this;
            });
        }
    }

    onDisconnect(callback) {
        if (this.client) {
            this.client.on('close', callback);
            return this;
        }
    }

    disconnect() {
        if (this.client) {
            this.client.end();
        }
    }

    /**
     * Publish message to a topic
     *
     * @param {string} topic - Topic to publish to
     * @param {string} message - JSON encoded payload to send
     */
    publish(topic, message) {
        if (this.client) {
            if (typeof message === 'string')
            // this.client.publish(topic, message);
                this.client.publish(topic, message, {qos: 0});
        }
    }

    subscribe(topic) {
        if (this.client) {
            this.client.subscribe(topic);
        }
    }

    unsubscribe(topic) {
        if (this.client) {
            this.client.unsubscribe(topic);
        }
    }
}

export default IoTClient;
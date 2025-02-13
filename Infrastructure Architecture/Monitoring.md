<h1 align='center'>Monitoring</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

## LGTM stack
- Loki: it's the service responsible for aggregating logs from applications. We usually go for a push-based model where applications push their logs using an agent like Promtail.
- Grafana: where we visualize all of our beautiful dashboards to centralize data.
- Tempo: it's a similar tool to Loki, but for traces, so applications use an agent to push traces to Tempo's scalable database.
- Mimir: it's sort of an extension to Prometheus, since it allows us to have a scalable database for metrics, which is something we cannot achieve with Prometheus alone, since we mostly scale it vertically. However, this doesn't mean Mimir replaces Prometheus completely, we still need it to obtain these metrics from the systems and provide them to Mimir.

## Pull Vs Push based monitoring systems
- Push
    - Use-cases:
        - Appropriate for logs since applications may not be producing them at all times, so there's no need to constantly be doing requests for logs when they don't exist.
        - Solves issues such as Firewall blocking from VPNs
    - Problems:
        - The system doesn't know what it should be monitoring, so how would it be able to differentiate when an instance doesn't report status because it's down due to an outage, or it's no longer meant to exist?
        - Install additional software or tool to push metrics
        - High load of network traffic
- Pull
    - Better detection/insight if service is up and running
    - Problem: Is Prometheus able to scale?
        - The database is able to scale using tools such as Mimir and Tempo.
        - In terms of performance, the last time I searched about this concern, I came to the conclusion that Prometheus is mostly scaled vertically. The community has made some heavy testing to ensure it can handle thousands of machines being scrapped every 15 seconds or so, using a single Prometheus instance.

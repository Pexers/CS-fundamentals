Prometheus collects rich metrics and provides a powerful querying language; 
Grafana transforms metrics into meaningful visualizations

--------

Prometheus
Pull system Vs Push system
- Pull system
    - multiple Prometheus instances can pull metrics data
    - better detection/insight if service is up and running
- Push system: Applications/Servers push to a centralized collection platform
    - high load of network traffic
    - monitoring can become your bottleneck
    - install additional software or tool to push metrics

Prometheus Metrics
- Format: Human-readable text-based
- Metrics entries: TYPE and HELP attributes
HELP - description of what the metrics is
TYPE - 3 metrics types
1) Counter: how many times x happened
2) Gauge: what is the current value of x now?
3) Histogram: how long or how big?

Grafana
- Grafana Loki
    - Promtail is an agent which ships the contents of local logs to a private Grafana Loki instance or Grafana Cloud. It is usually deployed to every machine that runs applications which need to be monitored.

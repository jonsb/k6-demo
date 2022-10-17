---
marp: true
# backgroundColor: "#F9EAD4"
style: |
    section{
      justify-content: flex-start;
    },

---

# Load Testing med K6
## Nordfløyen Tokaffe
21. september 2022

![bg right:50% w:500](slack.png)

```
> winget install k6
> k6 run --vus 10 --duration 30s .\load-test.js
```
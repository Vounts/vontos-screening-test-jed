# 📊 Vontos Grading Module

A dynamic and multilingual grading system for managing student competency assessments. Built with **Next.js 15 App Router**, **Prisma**, **PostgreSQL**, and **i18next**.

---

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-org/vontos-grading.git
cd vontos-grading
```

2. **Install dependencies**
npm install


3. **Configure environment variables**
Create a .env file
DATABASE_URL=
DIRECT_URL=
Will attach on email


4. **Generate Prisma Client**
npx prisma generate


5. **You can reseed DB**
npx prisma db seed

6. **Run development server**
npm run dev


**🌐 API Sample JSON**
Create Assessments (POST /api/assessments)
```bash
{
  "subjectId": "abc123",
  "assessments": [
    {
      "studentId": "stu001",
      "competencyId": "comp001",
      "score": 4
    },
    {
      "studentId": "stu001",
      "competencyId": "comp002",
      "score": 3
    }
  ]
}
```

Update Score (PATCH /api/assessments/:id)
```bash
{
  "score": 5
}
```

Fetch Student Assessments (GET /api/assessments/:studentId)
```bash
[
  {
    "subject": "Mathematics",
    "competency": "Problem Solving",
    "domain": "Cognitive",
    "score": 4,
    "assessedAt": "2025-06-11T10:20:00Z"
  }
]
```

**📸 Screenshots**



**📸 FOR Enhancements**
1. Setup Test Driven Environment (Jest, React Testing Library and Playwright)
2. JWT Authentication
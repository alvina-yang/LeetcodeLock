# Locked In

## Inspiration
In today's world of endless notifications and social media distractions, software engineers studying for technical interviews face a constant battle against their smartphones. Traditional study methods often fall short – engineers need a physical intervention combined with smart, personalized learning to maximize their study efficiency. This inspired us to create **Locked In**, a revolutionary approach to focused learning that locks away distractions while providing tailored technical interview preparation.

## What It Does
**Locked In** is a hardware-software hybrid solution that combines physical phone isolation with intelligent study assistance. The system consists of:
- A secure **Arduino-powered box** that safely locks your phone away while you study.
- A sophisticated **web platform** delivering personalized **Data Structures & Algorithms (DS&A)** practice problems.

Key features include:
- **Earn points**: For every 30 minutes your phone remains locked, earn points and unlock strategic grace periods.
- **Personalized learning**: Uses RAG models to analyze your technical skills and curate **LeetCode problems** targeting specific areas for improvement.
- **Sustainable rhythm**: Encourages focused study with periodic, structured breaks.

## How We Built It
We developed **Locked In** using a modern tech stack that integrates hardware and software components:

- **Frontend**: Built with **Next.js** for a responsive and intuitive user interface.
- **Backend**: Developed using **Flask** to handle core logic and API integrations.
- **Authentication**: Secured with **Auth0** for robust user management.
- **AI Integration**: Leveraged **OpenAI API** and **LangChain** for intelligent problem recommendations.
- **Hardware**: Designed an **Arduino-controlled locking mechanism** for secure phone storage.
- **Data Processing**: Used **RAG models** for skill assessment and problem matching.
- **Problem Database**: Incorporated a comprehensive CSV dataset of **LeetCode problems**.

## Challenges We Faced
1. **Integration with LeetCode**: Creating a seamless user experience while leveraging LeetCode’s extensive problem set required custom UI design and thoughtful feature integration.
2. **Skill Assessment Accuracy**: Calibrating RAG models to provide precise problem recommendations demanded iterative tuning and testing.
3. **Hardware-Software Coordination**: Building a reliable interface between the Arduino locking mechanism and the web platform posed unique technical challenges.

## What We Learned
This project provided invaluable experience in:
- Applying **OpenAI's API** for practical problem-solving applications.
- Optimizing **LangChain** for accurate answer processing and validation.
- Designing efficient search algorithms for large datasets.
- Developing intuitive **hardware-software interfaces**.
- Building sophisticated **RAG systems** for personalized learning.

## What's Next for Locked In
We're excited to grow **Locked In** by:
- **Integrating with additional platforms**: Connect with educational platforms and learning management systems.
- **Partnering with training programs**: Collaborate with coding bootcamps and technical training programs.
- **Expanding disciplines**: Apply our assisted Pomodoro technique to other educational fields.
- **Developing an API**: Allow educational content providers to plug into our platform.
- **Creating a mobile app**: Enable progress tracking and introduce community features.

## Built With
- **Arduino**
- **Next.js**
- **Flask**
- **Auth0**
- **RAG Models**
- **OpenAI API**
- **LangChain**

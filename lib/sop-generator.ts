interface FormData {
  fullName: string;
  email: string;
  targetUniversity: string;
  targetProgram: string;
  currentEducation: string;
  gpa: string;
  workExperience: string;
  researchExperience: string;
  extracurricularActivities: string;
  achievements: string;
  skills: string;
  careerGoals: string;
  whyThisProgram: string;
  whyThisUniversity: string;
  futurePlans: string;
}

export async function generateSOPWithOpenAI(data: FormData): Promise<string> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      throw new Error('OpenAI API key not configured');
    }
    
    console.log('Using OpenAI API key:', apiKey.substring(0, 10) + '...');
    
    const prompt = createSOPPrompt(data);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert academic writer specializing in creating compelling Statements of Purpose for university applications. You write in a professional, engaging, and authentic voice that reflects the applicant\'s unique background and aspirations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    console.log('OpenAI API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    const generatedSOP = result.choices[0].message.content;
    
    return generatedSOP || generateFallbackSOP(data);
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to template-based generation if API fails
    return generateFallbackSOP(data);
  }
}

function createSOPPrompt(data: FormData): string {
  return `Create a compelling Statement of Purpose for a university application based on the following information:

APPLICANT INFORMATION:
- Name: ${data.fullName}
- Email: ${data.email}
- Target University: ${data.targetUniversity}
- Target Program: ${data.targetProgram}
- Current Education: ${data.currentEducation}
- GPA: ${data.gpa || 'Not specified'}

BACKGROUND & EXPERIENCE:
- Work Experience: ${data.workExperience || 'None specified'}
- Research Experience: ${data.researchExperience || 'None specified'}
- Extracurricular Activities: ${data.extracurricularActivities || 'None specified'}
- Achievements & Awards: ${data.achievements || 'None specified'}
- Technical Skills: ${data.skills || 'None specified'}

GOALS & MOTIVATION:
- Career Goals: ${data.careerGoals}
- Why This Program: ${data.whyThisProgram}
- Why This University: ${data.whyThisUniversity}
- Future Plans: ${data.futurePlans || 'Not specified'}

INSTRUCTIONS:
1. Create a well-structured, professional Statement of Purpose (500-800 words)
2. Start with a compelling introduction that captures attention
3. Organize content into logical sections with smooth transitions
4. Use specific examples and details from the applicant's background
5. Demonstrate genuine interest in the program and university
6. Show how the applicant's background aligns with their goals
7. End with a strong conclusion that reinforces their fit for the program
8. Write in a professional but engaging tone
9. Avoid generic statements - make it personal and specific
10. Ensure the SOP flows naturally and tells a coherent story

FORMAT:
- Use proper paragraph structure
- Include a clear introduction, body paragraphs, and conclusion
- Make it easy to read with good transitions
- Keep sentences varied in length and structure

Please create a compelling SOP that will help this applicant stand out in their university application. Make it in human language and not like a robot. Also, make it in a way that is easy to understand and not too technical. Also, make it have a personal touch.`;
}

function generateFallbackSOP(data: FormData): string {
  // Generate personalized introduction
  const introduction = generateIntroduction(data);
  
  // Generate academic background section
  const academicSection = generateAcademicSection(data);
  
  // Generate experience section
  const experienceSection = generateExperienceSection(data);
  
  // Generate motivation section
  const motivationSection = generateMotivationSection(data);
  
  // Generate conclusion
  const conclusion = generateConclusion(data);
  
  return `${introduction}

${academicSection}

${experienceSection}

${motivationSection}

${conclusion}`;
}

function generateIntroduction(data: FormData): string {
  const currentStatus = data.currentEducation 
    ? `currently pursuing ${data.currentEducation}`
    : `a graduate with a strong academic background`;
  
  return `Statement of Purpose

Dear Admissions Committee,

I am writing to express my strong interest in the ${data.targetProgram} program at ${data.targetUniversity}. My name is ${data.fullName}, and I am ${currentStatus}. I am excited to apply for this program as it represents the perfect next step in my academic and professional journey, aligning seamlessly with my background, research interests, and long-term career aspirations.`;
}

function generateAcademicSection(data: FormData): string {
  let section = "Academic Background\n";
  
  section += `\nMy academic journey has been driven by a deep passion for learning and a commitment to excellence. I have completed ${data.currentEducation || 'my education'} with a strong foundation in my field of study.`;
  
  if (data.gpa && data.gpa.trim() !== '') {
    section += ` I have maintained a GPA of ${data.gpa}, demonstrating my dedication to academic excellence.`;
  }
  
  if (data.achievements && data.achievements.trim() !== '') {
    section += `\n\nNotable achievements include ${data.achievements.toLowerCase()}.`;
  }
  
  section += `\n\nThroughout my studies, I have actively engaged in coursework that has prepared me for advanced study in ${data.targetProgram}.`;
  
  return section;
}

function generateExperienceSection(data: FormData): string {
  let section = "";
  
  if (data.researchExperience && data.researchExperience.trim() !== '') {
    section += "Research Experience\n\n";
    section += `${data.researchExperience}\n\n`;
  }
  
  if (data.workExperience && data.workExperience.trim() !== '') {
    section += "Professional Experience\n\n";
    section += `${data.workExperience}\n\n`;
  }
  
  if (data.skills && data.skills.trim() !== '') {
    section += "Technical Skills and Competencies\n\n";
    section += `I have developed strong technical skills in ${data.skills.toLowerCase()}, which I believe will be valuable assets in the ${data.targetProgram} program.\n\n`;
  }
  
  if (data.extracurricularActivities && data.extracurricularActivities.trim() !== '') {
    section += "Extracurricular Activities\n\n";
    section += `${data.extracurricularActivities}\n\n`;
  }
  
  return section;
}

function generateMotivationSection(data: FormData): string {
  let section = "Motivation and Goals\n\n";
  
  if (data.careerGoals && data.careerGoals.trim() !== '') {
    section += `Career Goals\n\n${data.careerGoals}\n\n`;
  }
  
  if (data.whyThisProgram && data.whyThisProgram.trim() !== '') {
    section += `Why This Program\n\n${data.whyThisProgram}\n\n`;
  }
  
  if (data.whyThisUniversity && data.whyThisUniversity.trim() !== '') {
    section += `Why ${data.targetUniversity}\n\n${data.whyThisUniversity}\n\n`;
  }
  
  return section;
}

function generateConclusion(data: FormData): string {
  let conclusion = "Conclusion\n\n";
  
  conclusion += `I am confident that my academic background, professional experience, and passion for ${data.targetProgram} make me an excellent candidate for this program. `;
  
  if (data.futurePlans && data.futurePlans.trim() !== '') {
    conclusion += `${data.futurePlans} `;
  }
  
  conclusion += `I am excited about the opportunity to contribute to the academic community at ${data.targetUniversity} and to learn from distinguished faculty and fellow students. I look forward to the possibility of joining your program and contributing to the university's tradition of excellence.\n\n`;
  
  conclusion += `Thank you for considering my application. I am available for an interview at your convenience and would welcome the opportunity to discuss my qualifications in person.\n\n`;
  
  conclusion += `Sincerely,\n${data.fullName}`;
  
  return conclusion;
}

// Legacy function for backward compatibility
export function generateSOP(data: FormData): string {
  return generateFallbackSOP(data);
}

export function generateEnhancedSOP(data: FormData): string {
  const sop = generateFallbackSOP(data);
  
  // Clean up the generated SOP
  return sop
    .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
    .replace(/\s+$/gm, '') // Remove trailing spaces
    .trim();
}

export function generateSOPWithStyle(data: FormData, style: 'formal' | 'conversational' | 'technical' = 'formal'): string {
  const baseSOP = generateFallbackSOP(data);
  
  switch (style) {
    case 'conversational':
      return baseSOP.replace(/Dear Admissions Committee,/g, 'Hi there!')
                    .replace(/Sincerely,/g, 'Best regards,')
                    .replace(/I am writing to express/g, 'I wanted to share');
    case 'technical':
      return baseSOP.replace(/Dear Admissions Committee,/g, 'To Whom It May Concern,')
                    .replace(/I am excited to apply/g, 'I am submitting my application')
                    .replace(/I look forward to/g, 'I anticipate');
    default:
      return baseSOP;
  }
} 
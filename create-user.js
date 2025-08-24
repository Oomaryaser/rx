// انشئ ملف اسمه create-user.js في مجلد المشروع واكتب هذا الكود

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createUser() {
  try {
    // كلمة المرور اللي راح تستخدمها
    const password = '123456';
    
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // إنشاء المستخدم
      const user = await prisma.user.create({
        data: {
          name: 'Admin User',
          email: 'admin@test.com',
          phone: '+9647700000002',
          passwordHash: hashedPassword,
          role: 'ADMIN'
        }
      });
    
    console.log('✅ تم إنشاء المستخدم بنجاح:');
    console.log('الإيميل:', user.email);
    console.log('الهاتف:', user.phone);
    console.log('كلمة المرور:', password);
    console.log('الدور:', user.role);
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️ المستخدم موجود مسبقاً');
    } else {
      console.error('خطأ في إنشاء المستخدم:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
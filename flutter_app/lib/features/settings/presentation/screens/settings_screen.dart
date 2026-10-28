import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class SettingsScreen extends StatelessWidget {
  final Function(Locale) onLocaleChange;
  const SettingsScreen({super.key, required this.onLocaleChange});

  @override
  Widget build(BuildContext context) {
    final isArabic = Localizations.localeOf(context).languageCode == 'ar';

    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        backgroundColor: AppColors.darkSurface,
        title: Text(isArabic ? 'الإعدادات' : 'Settings', style: const TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          ListTile(
            tileColor: AppColors.darkCard,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            leading: const Icon(Icons.language_rounded, color: AppColors.accentGreen),
            title: Text(isArabic ? 'اللغة / Language' : 'Language'),
            subtitle: Text(isArabic ? 'العربية' : 'English'),
            trailing: Switch(
              value: isArabic,
              activeColor: AppColors.accentGreen,
              onChanged: (val) {
                onLocaleChange(val ? const Locale('ar') : const Locale('en'));
              },
            ),
          ),
          const SizedBox(height: 12),
          ListTile(
            tileColor: AppColors.darkCard,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            leading: const Icon(Icons.notifications_active_rounded, color: AppColors.accentGreen),
            title: Text(isArabic ? 'إشعارات الأهداف' : 'Goal Notifications'),
            trailing: Switch(value: true, activeColor: AppColors.accentGreen, onChanged: (_) {}),
          ),
          const SizedBox(height: 12),
          ListTile(
            tileColor: AppColors.darkCard,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            leading: const Icon(Icons.key_rounded, color: AppColors.accentGreen),
            title: Text(isArabic ? 'مفتاح API-Football' : 'API-Football Key'),
            subtitle: const Text('x-apisports-key', style: TextStyle(fontSize: 11)),
            trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
          ),
        ],
      ),
    );
  }
}

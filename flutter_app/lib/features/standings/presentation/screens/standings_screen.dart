import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class StandingsScreen extends StatelessWidget {
  const StandingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        backgroundColor: AppColors.darkSurface,
        title: const Text('جدول الترتيب', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: ListView(
        padding: const EdgeInsets.all(12),
        children: [
          _buildStandingsRow('1', 'ليفربول', '28', '+42', '65', Colors.blue),
          _buildStandingsRow('2', 'أرسنال', '28', '+34', '61', Colors.blue),
          _buildStandingsRow('3', 'مان سيتي', '28', '+28', '56', Colors.blue),
          _buildStandingsRow('4', 'تشيلسي', '28', '+19', '52', Colors.blue),
          _buildStandingsRow('5', 'أستون فيلا', '28', '+10', '50', Colors.orange),
          _buildStandingsRow('18', 'إيفرتون', '28', '-15', '27', Colors.red),
          _buildStandingsRow('19', 'وولفرهامبتون', '28', '-23', '22', Colors.red),
          _buildStandingsRow('20', 'ساوثهامبتون', '28', '-47', '10', Colors.red),
        ],
      ),
    );
  }

  Widget _buildStandingsRow(String rank, String team, String p, String gd, String pts, Color zoneColor) {
    return Container(
      margin: const EdgeInsets.only(bottom: 6),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.darkCard,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Container(width: 4, height: 16, decoration: BoxDecoration(color: zoneColor, borderRadius: BorderRadius.circular(2))),
          const SizedBox(width: 8),
          SizedBox(width: 24, child: Text(rank, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13))),
          Expanded(child: Text(team, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13))),
          SizedBox(width: 32, child: Text(p, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white70))),
          SizedBox(width: 40, child: Text(gd, textAlign: TextAlign.center, style: const TextStyle(color: Colors.white70))),
          SizedBox(width: 36, child: Text(pts, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.accentGreen))),
        ],
      ),
    );
  }
}

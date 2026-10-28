import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../match_details/presentation/screens/match_details_screen.dart';

class ScoresScreen extends StatelessWidget {
  const ScoresScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        backgroundColor: AppColors.darkSurface,
        title: const Text('ScorePulse Live', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(icon: const Icon(Icons.calendar_today_rounded, size: 20), onPressed: () {}),
          IconButton(icon: const Icon(Icons.notifications_none_rounded), onPressed: () {}),
        ],
      ),
      body: ListView(
        children: [
          // Date strip
          Container(
            height: 48,
            color: AppColors.darkSurface,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
              children: [
                _buildDateChip('الأمس', false),
                _buildDateChip('اليوم', true),
                _buildDateChip('الغد', false),
                _buildDateChip('29 أكتوبر', false),
              ],
            ),
          ),

          // Matches
          _buildLeagueHeader('الدوري الإنجليزي الممتاز', '🇬🇧'),
          _buildMatchCard(
            context,
            home: 'أرسنال',
            away: 'تشيلسي',
            score: '2 - 1',
            status: "68'",
            isLive: true,
          ),
          _buildMatchCard(
            context,
            home: 'ليفربول',
            away: 'مانشستر سيتي',
            score: '2 - 0',
            status: 'FT',
            isLive: false,
          ),

          _buildLeagueHeader('الدوري الإسباني', '🇪🇸'),
          _buildMatchCard(
            context,
            home: 'ريال مدريد',
            away: 'برشلونة',
            score: '1 - 1',
            status: "53'",
            isLive: true,
          ),

          _buildLeagueHeader('الدوري المصري الممتاز', '🇪🇬'),
          _buildMatchCard(
            context,
            home: 'الأهلي',
            away: 'الزمالك',
            score: '2 - 1',
            status: "74'",
            isLive: true,
          ),
        ],
      ),
    );
  }

  Widget _buildDateChip(String label, bool isSelected) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 4),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
      decoration: BoxDecoration(
        color: isSelected ? AppColors.accentGreen : AppColors.darkCard,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Center(
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: isSelected ? Colors.black : Colors.white,
          ),
        ),
      ),
    );
  }

  Widget _buildLeagueHeader(String title, String flag) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      color: Colors.black26,
      child: Row(
        children: [
          Text(flag, style: const TextStyle(fontSize: 16)),
          const SizedBox(width: 8),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white70)),
        ],
      ),
    );
  }

  Widget _buildMatchCard(BuildContext context, {
    required String home,
    required String away,
    required String score,
    required String status,
    required bool isLive,
  }) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => MatchDetailsScreen(
              matchData: {
                'homeTeam': home,
                'awayTeam': away,
                'homeScore': int.parse(score.split('-')[0].trim()),
                'awayScore': int.parse(score.split('-')[1].trim()),
                'minute': 68,
              },
            ),
          ),
        );
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.darkCard,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isLive ? AppColors.accentGreen.withValues(alpha: 0.3) : AppColors.darkBorder,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(child: Text(home, textAlign: TextAlign.right, style: const TextStyle(fontWeight: FontWeight.bold))),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: [
                  Text(
                    score,
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w900,
                      color: isLive ? AppColors.accentGreen : Colors.white,
                    ),
                  ),
                  Text(
                    status,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: isLive ? AppColors.accentGreen : AppColors.textMuted,
                    ),
                  ),
                ],
              ),
            ),
            Expanded(child: Text(away, textAlign: TextAlign.left, style: const TextStyle(fontWeight: FontWeight.bold))),
          ],
        ),
      ),
    );
  }
}

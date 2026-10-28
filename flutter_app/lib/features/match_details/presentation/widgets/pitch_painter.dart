import 'package:flutter/material.dart';

class PitchPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // 1. Draw alternating grass stripes
    final stripeHeight = size.height / 10;
    for (int i = 0; i < 10; i++) {
      final stripePaint = Paint()
        ..color = i % 2 == 0 ? const Color(0xFF1B4D24) : const Color(0xFF163E1D);
      canvas.drawRect(
        Rect.fromLTWH(0, i * stripeHeight, size.width, stripeHeight),
        stripePaint,
      );
    }

    // 2. White Line Painter
    final linePaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.75)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.2;

    final dotPaint = Paint()
      ..color = Colors.white.withValues(alpha: 0.8)
      ..style = PaintingStyle.fill;

    // Pitch outer border
    final fieldRect = Rect.fromLTWH(8, 8, size.width - 16, size.height - 16);
    canvas.drawRect(fieldRect, linePaint);

    // Half-way line
    final midY = size.height / 2;
    canvas.drawLine(Offset(8, midY), Offset(size.width - 8, midY), linePaint);

    // Center circle
    final centerCircleRadius = size.width * 0.18;
    canvas.drawCircle(Offset(size.width / 2, midY), centerCircleRadius, linePaint);
    canvas.drawCircle(Offset(size.width / 2, midY), 2.5, dotPaint);

    // Top Penalty Area (Home Goal)
    final penaltyBoxWidth = size.width * 0.55;
    final penaltyBoxHeight = size.height * 0.16;
    final penaltyBoxLeft = (size.width - penaltyBoxWidth) / 2;
    canvas.drawRect(
      Rect.fromLTWH(penaltyBoxLeft, 8, penaltyBoxWidth, penaltyBoxHeight),
      linePaint,
    );

    // Top Goal Area (6-yard box)
    final goalAreaWidth = size.width * 0.28;
    final goalAreaHeight = size.height * 0.06;
    final goalAreaLeft = (size.width - goalAreaWidth) / 2;
    canvas.drawRect(
      Rect.fromLTWH(goalAreaLeft, 8, goalAreaWidth, goalAreaHeight),
      linePaint,
    );
    canvas.drawCircle(Offset(size.width / 2, 8 + penaltyBoxHeight * 0.7), 2.0, dotPaint);

    // Bottom Penalty Area (Away Goal)
    canvas.drawRect(
      Rect.fromLTWH(penaltyBoxLeft, size.height - 8 - penaltyBoxHeight, penaltyBoxWidth, penaltyBoxHeight),
      linePaint,
    );

    // Bottom Goal Area (6-yard box)
    canvas.drawRect(
      Rect.fromLTWH(goalAreaLeft, size.height - 8 - goalAreaHeight, goalAreaWidth, goalAreaHeight),
      linePaint,
    );
    canvas.drawCircle(Offset(size.width / 2, size.height - 8 - penaltyBoxHeight * 0.7), 2.0, dotPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

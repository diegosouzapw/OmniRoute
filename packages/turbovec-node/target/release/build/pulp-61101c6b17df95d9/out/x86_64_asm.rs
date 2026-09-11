core::arch::global_asm! {"
.global libpulp_v0_21_5_ld_b32s_1000000000000000
libpulp_v0_21_5_ld_b32s_1000000000000000:
vmovss xmm0, [rax + 0]
jmp rcx
.global libpulp_v0_21_5_st_b32s_1000000000000000
libpulp_v0_21_5_st_b32s_1000000000000000:
vmovss [rax + 0], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000000000
libpulp_v0_21_5_ld_b32s_0000000000000000:
vxorps xmm0, xmm0, xmm0
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000000000
libpulp_v0_21_5_st_b32s_0000000000000000:
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1100000000000000
libpulp_v0_21_5_ld_b32s_1100000000000000:
vmovsd xmm0, [rax + 0]
jmp rcx
.global libpulp_v0_21_5_st_b32s_1100000000000000
libpulp_v0_21_5_st_b32s_1100000000000000:
vmovsd [rax + 0], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0100000000000000
libpulp_v0_21_5_ld_b32s_0100000000000000:
vmovss xmm0, [rax + 4]
vpslldq xmm0, xmm0, 4
jmp rcx
.global libpulp_v0_21_5_st_b32s_0100000000000000
libpulp_v0_21_5_st_b32s_0100000000000000:
vpsrldq xmm0, xmm0, 4
vmovss [rax + 4], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1110000000000000
libpulp_v0_21_5_ld_b32s_1110000000000000:
vmovsd xmm0, [rax + 0]
vpinsrd xmm0, xmm0, [rax + 0 + 8], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_1110000000000000
libpulp_v0_21_5_st_b32s_1110000000000000:
vmovsd [rax + 0], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 0 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0110000000000000
libpulp_v0_21_5_ld_b32s_0110000000000000:
vmovsd xmm0, [rax + 4]
vpslldq xmm0, xmm0, 4
jmp rcx
.global libpulp_v0_21_5_st_b32s_0110000000000000
libpulp_v0_21_5_st_b32s_0110000000000000:
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0010000000000000
libpulp_v0_21_5_ld_b32s_0010000000000000:
vmovss xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
jmp rcx
.global libpulp_v0_21_5_st_b32s_0010000000000000
libpulp_v0_21_5_st_b32s_0010000000000000:
vpsrldq xmm0, xmm0, 8
vmovss [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111000000000000
libpulp_v0_21_5_ld_b32s_1111000000000000:
vmovups xmm0, [rax + 0]
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111000000000000
libpulp_v0_21_5_st_b32s_1111000000000000:
vmovups [rax + 0], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111000000000000
libpulp_v0_21_5_ld_b32s_0111000000000000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111000000000000
libpulp_v0_21_5_st_b32s_0111000000000000:
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011000000000000
libpulp_v0_21_5_ld_b32s_0011000000000000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011000000000000
libpulp_v0_21_5_st_b32s_0011000000000000:
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001000000000000
libpulp_v0_21_5_ld_b32s_0001000000000000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001000000000000
libpulp_v0_21_5_st_b32s_0001000000000000:
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111100000000000
libpulp_v0_21_5_ld_b32s_1111100000000000:
vmovups xmm0, [rax + 0]
vmovss xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111100000000000
libpulp_v0_21_5_st_b32s_1111100000000000:
vextractf128 xmm1, ymm0, 0x1
vmovss [rax + 16], xmm1
vmovups [rax + 0], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111100000000000
libpulp_v0_21_5_ld_b32s_0111100000000000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vmovss xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111100000000000
libpulp_v0_21_5_st_b32s_0111100000000000:
vextractf128 xmm1, ymm0, 0x1
vmovss [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011100000000000
libpulp_v0_21_5_ld_b32s_0011100000000000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vmovss xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011100000000000
libpulp_v0_21_5_st_b32s_0011100000000000:
vextractf128 xmm1, ymm0, 0x1
vmovss [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001100000000000
libpulp_v0_21_5_ld_b32s_0001100000000000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vmovss xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001100000000000
libpulp_v0_21_5_st_b32s_0001100000000000:
vextractf128 xmm1, ymm0, 0x1
vmovss [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000100000000000
libpulp_v0_21_5_ld_b32s_0000100000000000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000100000000000
libpulp_v0_21_5_st_b32s_0000100000000000:
vextractf128 xmm1, ymm0, 0x1
vmovss [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111110000000000
libpulp_v0_21_5_ld_b32s_1111110000000000:
vmovups xmm0, [rax + 0]
vmovsd xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111110000000000
libpulp_v0_21_5_st_b32s_1111110000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
vmovups [rax + 0], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111110000000000
libpulp_v0_21_5_ld_b32s_0111110000000000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vmovsd xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111110000000000
libpulp_v0_21_5_st_b32s_0111110000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011110000000000
libpulp_v0_21_5_ld_b32s_0011110000000000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vmovsd xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011110000000000
libpulp_v0_21_5_st_b32s_0011110000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001110000000000
libpulp_v0_21_5_ld_b32s_0001110000000000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vmovsd xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001110000000000
libpulp_v0_21_5_st_b32s_0001110000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000110000000000
libpulp_v0_21_5_ld_b32s_0000110000000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 16]
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000110000000000
libpulp_v0_21_5_st_b32s_0000110000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000010000000000
libpulp_v0_21_5_ld_b32s_0000010000000000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 20]
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000010000000000
libpulp_v0_21_5_st_b32s_0000010000000000:
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovss [rax + 20], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111000000000
libpulp_v0_21_5_ld_b32s_1111111000000000:
vmovups xmm0, [rax + 0]
vmovsd xmm1, [rax + 16]
vpinsrd xmm1, xmm1, [rax + 16 + 8], 0x2
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111000000000
libpulp_v0_21_5_st_b32s_1111111000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 16 + 8], xmm1
vmovups [rax + 0], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111000000000
libpulp_v0_21_5_ld_b32s_0111111000000000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vmovsd xmm1, [rax + 16]
vpinsrd xmm1, xmm1, [rax + 16 + 8], 0x2
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111000000000
libpulp_v0_21_5_st_b32s_0111111000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 16 + 8], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111000000000
libpulp_v0_21_5_ld_b32s_0011111000000000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vmovsd xmm1, [rax + 16]
vpinsrd xmm1, xmm1, [rax + 16 + 8], 0x2
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111000000000
libpulp_v0_21_5_st_b32s_0011111000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 16 + 8], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111000000000
libpulp_v0_21_5_ld_b32s_0001111000000000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vmovsd xmm1, [rax + 16]
vpinsrd xmm1, xmm1, [rax + 16 + 8], 0x2
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111000000000
libpulp_v0_21_5_st_b32s_0001111000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 16 + 8], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111000000000
libpulp_v0_21_5_ld_b32s_0000111000000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 16]
vpinsrd xmm1, xmm1, [rax + 16 + 8], 0x2
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111000000000
libpulp_v0_21_5_st_b32s_0000111000000000:
vextractf128 xmm1, ymm0, 0x1
vmovsd [rax + 16], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 16 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011000000000
libpulp_v0_21_5_ld_b32s_0000011000000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011000000000
libpulp_v0_21_5_st_b32s_0000011000000000:
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001000000000
libpulp_v0_21_5_ld_b32s_0000001000000000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001000000000
libpulp_v0_21_5_st_b32s_0000001000000000:
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111100000000
libpulp_v0_21_5_ld_b32s_1111111100000000:
vmovups ymm0, [rax]
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111100000000
libpulp_v0_21_5_st_b32s_1111111100000000:
vmovups [rax], ymm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111100000000
libpulp_v0_21_5_ld_b32s_0111111100000000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111100000000
libpulp_v0_21_5_st_b32s_0111111100000000:
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111100000000
libpulp_v0_21_5_ld_b32s_0011111100000000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111100000000
libpulp_v0_21_5_st_b32s_0011111100000000:
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111100000000
libpulp_v0_21_5_ld_b32s_0001111100000000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111100000000
libpulp_v0_21_5_st_b32s_0001111100000000:
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111100000000
libpulp_v0_21_5_ld_b32s_0000111100000000:
vxorps xmm0, xmm0, xmm0
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111100000000
libpulp_v0_21_5_st_b32s_0000111100000000:
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011100000000
libpulp_v0_21_5_ld_b32s_0000011100000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpinsrd xmm1, xmm1, [rax + 20 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011100000000
libpulp_v0_21_5_st_b32s_0000011100000000:
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 20 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001100000000
libpulp_v0_21_5_ld_b32s_0000001100000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001100000000
libpulp_v0_21_5_st_b32s_0000001100000000:
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000100000000
libpulp_v0_21_5_ld_b32s_0000000100000000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 28]
vpslldq xmm1, xmm1, 12
vinsertf128 ymm0, ymm0, xmm1, 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000100000000
libpulp_v0_21_5_st_b32s_0000000100000000:
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 12
vmovss [rax + 28], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111110000000
libpulp_v0_21_5_ld_b32s_1111111110000000:
vmovups ymm0, [rax]
vmovss xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111110000000
libpulp_v0_21_5_st_b32s_1111111110000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovss [rax + 32], xmm1
vmovups [rax], ymm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111110000000
libpulp_v0_21_5_ld_b32s_0111111110000000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovss xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111110000000
libpulp_v0_21_5_st_b32s_0111111110000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovss [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111110000000
libpulp_v0_21_5_ld_b32s_0011111110000000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovss xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111110000000
libpulp_v0_21_5_st_b32s_0011111110000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovss [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111110000000
libpulp_v0_21_5_ld_b32s_0001111110000000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovss xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111110000000
libpulp_v0_21_5_st_b32s_0001111110000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovss [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111110000000
libpulp_v0_21_5_ld_b32s_0000111110000000:
vxorps xmm0, xmm0, xmm0
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovss xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111110000000
libpulp_v0_21_5_st_b32s_0000111110000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovss [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011110000000
libpulp_v0_21_5_ld_b32s_0000011110000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpinsrd xmm1, xmm1, [rax + 20 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovss xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011110000000
libpulp_v0_21_5_st_b32s_0000011110000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovss [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 20 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001110000000
libpulp_v0_21_5_ld_b32s_0000001110000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovss xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001110000000
libpulp_v0_21_5_st_b32s_0000001110000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovss [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000110000000
libpulp_v0_21_5_ld_b32s_0000000110000000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 28]
vpslldq xmm1, xmm1, 12
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovss xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000110000000
libpulp_v0_21_5_st_b32s_0000000110000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovss [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 12
vmovss [rax + 28], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000010000000
libpulp_v0_21_5_ld_b32s_0000000010000000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000010000000
libpulp_v0_21_5_st_b32s_0000000010000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovss [rax + 32], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111111000000
libpulp_v0_21_5_ld_b32s_1111111111000000:
vmovups ymm0, [rax]
vmovsd xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111111000000
libpulp_v0_21_5_st_b32s_1111111111000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vmovups [rax], ymm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111111000000
libpulp_v0_21_5_ld_b32s_0111111111000000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovsd xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111111000000
libpulp_v0_21_5_st_b32s_0111111111000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111111000000
libpulp_v0_21_5_ld_b32s_0011111111000000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovsd xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111111000000
libpulp_v0_21_5_st_b32s_0011111111000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111111000000
libpulp_v0_21_5_ld_b32s_0001111111000000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovsd xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111111000000
libpulp_v0_21_5_st_b32s_0001111111000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111111000000
libpulp_v0_21_5_ld_b32s_0000111111000000:
vxorps xmm0, xmm0, xmm0
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovsd xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111111000000
libpulp_v0_21_5_st_b32s_0000111111000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011111000000
libpulp_v0_21_5_ld_b32s_0000011111000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpinsrd xmm1, xmm1, [rax + 20 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovsd xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011111000000
libpulp_v0_21_5_st_b32s_0000011111000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 20 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001111000000
libpulp_v0_21_5_ld_b32s_0000001111000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovsd xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001111000000
libpulp_v0_21_5_st_b32s_0000001111000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000111000000
libpulp_v0_21_5_ld_b32s_0000000111000000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 28]
vpslldq xmm1, xmm1, 12
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovsd xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000111000000
libpulp_v0_21_5_st_b32s_0000000111000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 12
vmovss [rax + 28], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000011000000
libpulp_v0_21_5_ld_b32s_0000000011000000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000011000000
libpulp_v0_21_5_st_b32s_0000000011000000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000001000000
libpulp_v0_21_5_ld_b32s_0000000001000000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 36]
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000001000000
libpulp_v0_21_5_st_b32s_0000000001000000:
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 4
vmovss [rax + 36], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111111100000
libpulp_v0_21_5_ld_b32s_1111111111100000:
vmovups ymm0, [rax]
vmovsd xmm1, [rax + 32]
vpinsrd xmm1, xmm1, [rax + 32 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111111100000
libpulp_v0_21_5_st_b32s_1111111111100000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 32 + 8], xmm1
vmovups [rax], ymm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111111100000
libpulp_v0_21_5_ld_b32s_0111111111100000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovsd xmm1, [rax + 32]
vpinsrd xmm1, xmm1, [rax + 32 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111111100000
libpulp_v0_21_5_st_b32s_0111111111100000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 32 + 8], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111111100000
libpulp_v0_21_5_ld_b32s_0011111111100000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovsd xmm1, [rax + 32]
vpinsrd xmm1, xmm1, [rax + 32 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111111100000
libpulp_v0_21_5_st_b32s_0011111111100000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 32 + 8], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111111100000
libpulp_v0_21_5_ld_b32s_0001111111100000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovsd xmm1, [rax + 32]
vpinsrd xmm1, xmm1, [rax + 32 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111111100000
libpulp_v0_21_5_st_b32s_0001111111100000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 32 + 8], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111111100000
libpulp_v0_21_5_ld_b32s_0000111111100000:
vxorps xmm0, xmm0, xmm0
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovsd xmm1, [rax + 32]
vpinsrd xmm1, xmm1, [rax + 32 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111111100000
libpulp_v0_21_5_st_b32s_0000111111100000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 32 + 8], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011111100000
libpulp_v0_21_5_ld_b32s_0000011111100000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpinsrd xmm1, xmm1, [rax + 20 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovsd xmm1, [rax + 32]
vpinsrd xmm1, xmm1, [rax + 32 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011111100000
libpulp_v0_21_5_st_b32s_0000011111100000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 32 + 8], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 20 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001111100000
libpulp_v0_21_5_ld_b32s_0000001111100000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovsd xmm1, [rax + 32]
vpinsrd xmm1, xmm1, [rax + 32 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001111100000
libpulp_v0_21_5_st_b32s_0000001111100000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 32 + 8], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000111100000
libpulp_v0_21_5_ld_b32s_0000000111100000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 28]
vpslldq xmm1, xmm1, 12
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovsd xmm1, [rax + 32]
vpinsrd xmm1, xmm1, [rax + 32 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000111100000
libpulp_v0_21_5_st_b32s_0000000111100000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 32 + 8], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 12
vmovss [rax + 28], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000011100000
libpulp_v0_21_5_ld_b32s_0000000011100000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 32]
vpinsrd xmm1, xmm1, [rax + 32 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000011100000
libpulp_v0_21_5_st_b32s_0000000011100000:
vextractf64x2 xmm1, zmm0, 0x2
vmovsd [rax + 32], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 32 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000001100000
libpulp_v0_21_5_ld_b32s_0000000001100000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 36]
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000001100000
libpulp_v0_21_5_st_b32s_0000000001100000:
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 36], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000100000
libpulp_v0_21_5_ld_b32s_0000000000100000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 40]
vpslldq xmm1, xmm1, 8
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000100000
libpulp_v0_21_5_st_b32s_0000000000100000:
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 8
vmovss [rax + 40], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111111110000
libpulp_v0_21_5_ld_b32s_1111111111110000:
vmovups ymm0, [rax]
vinsertf64x2 zmm0, zmm0, [rax + 32], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111111110000
libpulp_v0_21_5_st_b32s_1111111111110000:
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vmovups [rax], ymm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111111110000
libpulp_v0_21_5_ld_b32s_0111111111110000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vinsertf64x2 zmm0, zmm0, [rax + 32], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111111110000
libpulp_v0_21_5_st_b32s_0111111111110000:
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111111110000
libpulp_v0_21_5_ld_b32s_0011111111110000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vinsertf64x2 zmm0, zmm0, [rax + 32], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111111110000
libpulp_v0_21_5_st_b32s_0011111111110000:
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111111110000
libpulp_v0_21_5_ld_b32s_0001111111110000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vinsertf64x2 zmm0, zmm0, [rax + 32], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111111110000
libpulp_v0_21_5_st_b32s_0001111111110000:
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111111110000
libpulp_v0_21_5_ld_b32s_0000111111110000:
vxorps xmm0, xmm0, xmm0
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vinsertf64x2 zmm0, zmm0, [rax + 32], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111111110000
libpulp_v0_21_5_st_b32s_0000111111110000:
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011111110000
libpulp_v0_21_5_ld_b32s_0000011111110000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpinsrd xmm1, xmm1, [rax + 20 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
vinsertf64x2 zmm0, zmm0, [rax + 32], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011111110000
libpulp_v0_21_5_st_b32s_0000011111110000:
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 20 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001111110000
libpulp_v0_21_5_ld_b32s_0000001111110000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
vinsertf64x2 zmm0, zmm0, [rax + 32], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001111110000
libpulp_v0_21_5_st_b32s_0000001111110000:
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000111110000
libpulp_v0_21_5_ld_b32s_0000000111110000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 28]
vpslldq xmm1, xmm1, 12
vinsertf128 ymm0, ymm0, xmm1, 0x1
vinsertf64x2 zmm0, zmm0, [rax + 32], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000111110000
libpulp_v0_21_5_st_b32s_0000000111110000:
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 12
vmovss [rax + 28], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000011110000
libpulp_v0_21_5_ld_b32s_0000000011110000:
vxorps xmm0, xmm0, xmm0
vinsertf64x2 zmm0, zmm0, [rax + 32], 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000011110000
libpulp_v0_21_5_st_b32s_0000000011110000:
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000001110000
libpulp_v0_21_5_ld_b32s_0000000001110000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 36]
vpinsrd xmm1, xmm1, [rax + 36 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000001110000
libpulp_v0_21_5_st_b32s_0000000001110000:
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 36], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 36 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000110000
libpulp_v0_21_5_ld_b32s_0000000000110000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 40]
vpslldq xmm1, xmm1, 8
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000110000
libpulp_v0_21_5_st_b32s_0000000000110000:
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 40], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000010000
libpulp_v0_21_5_ld_b32s_0000000000010000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 44]
vpslldq xmm1, xmm1, 12
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000010000
libpulp_v0_21_5_st_b32s_0000000000010000:
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 12
vmovss [rax + 44], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111111111000
libpulp_v0_21_5_ld_b32s_1111111111111000:
vmovups ymm0, [rax]
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111111111000
libpulp_v0_21_5_st_b32s_1111111111111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vmovups [rax], ymm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111111111000
libpulp_v0_21_5_ld_b32s_0111111111111000:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111111111000
libpulp_v0_21_5_st_b32s_0111111111111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111111111000
libpulp_v0_21_5_ld_b32s_0011111111111000:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111111111000
libpulp_v0_21_5_st_b32s_0011111111111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111111111000
libpulp_v0_21_5_ld_b32s_0001111111111000:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111111111000
libpulp_v0_21_5_st_b32s_0001111111111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111111111000
libpulp_v0_21_5_ld_b32s_0000111111111000:
vxorps xmm0, xmm0, xmm0
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111111111000
libpulp_v0_21_5_st_b32s_0000111111111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011111111000
libpulp_v0_21_5_ld_b32s_0000011111111000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpinsrd xmm1, xmm1, [rax + 20 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011111111000
libpulp_v0_21_5_st_b32s_0000011111111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 20 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001111111000
libpulp_v0_21_5_ld_b32s_0000001111111000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001111111000
libpulp_v0_21_5_st_b32s_0000001111111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000111111000
libpulp_v0_21_5_ld_b32s_0000000111111000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 28]
vpslldq xmm1, xmm1, 12
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000111111000
libpulp_v0_21_5_st_b32s_0000000111111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 12
vmovss [rax + 28], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000011111000
libpulp_v0_21_5_ld_b32s_0000000011111000:
vxorps xmm0, xmm0, xmm0
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000011111000
libpulp_v0_21_5_st_b32s_0000000011111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000001111000
libpulp_v0_21_5_ld_b32s_0000000001111000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 36]
vpinsrd xmm1, xmm1, [rax + 36 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000001111000
libpulp_v0_21_5_st_b32s_0000000001111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 36], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 36 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000111000
libpulp_v0_21_5_ld_b32s_0000000000111000:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 40]
vpslldq xmm1, xmm1, 8
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000111000
libpulp_v0_21_5_st_b32s_0000000000111000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 40], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000011000
libpulp_v0_21_5_ld_b32s_0000000000011000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 44]
vpslldq xmm1, xmm1, 12
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000011000
libpulp_v0_21_5_st_b32s_0000000000011000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 12
vmovss [rax + 44], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000001000
libpulp_v0_21_5_ld_b32s_0000000000001000:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000001000
libpulp_v0_21_5_st_b32s_0000000000001000:
vextractf64x2 xmm1, zmm0, 0x3
vmovss [rax + 48], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111111111100
libpulp_v0_21_5_ld_b32s_1111111111111100:
vmovups ymm0, [rax]
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111111111100
libpulp_v0_21_5_st_b32s_1111111111111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vmovups [rax], ymm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111111111100
libpulp_v0_21_5_ld_b32s_0111111111111100:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111111111100
libpulp_v0_21_5_st_b32s_0111111111111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111111111100
libpulp_v0_21_5_ld_b32s_0011111111111100:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111111111100
libpulp_v0_21_5_st_b32s_0011111111111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111111111100
libpulp_v0_21_5_ld_b32s_0001111111111100:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111111111100
libpulp_v0_21_5_st_b32s_0001111111111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111111111100
libpulp_v0_21_5_ld_b32s_0000111111111100:
vxorps xmm0, xmm0, xmm0
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111111111100
libpulp_v0_21_5_st_b32s_0000111111111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011111111100
libpulp_v0_21_5_ld_b32s_0000011111111100:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpinsrd xmm1, xmm1, [rax + 20 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011111111100
libpulp_v0_21_5_st_b32s_0000011111111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 20 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001111111100
libpulp_v0_21_5_ld_b32s_0000001111111100:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001111111100
libpulp_v0_21_5_st_b32s_0000001111111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000111111100
libpulp_v0_21_5_ld_b32s_0000000111111100:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 28]
vpslldq xmm1, xmm1, 12
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000111111100
libpulp_v0_21_5_st_b32s_0000000111111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 12
vmovss [rax + 28], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000011111100
libpulp_v0_21_5_ld_b32s_0000000011111100:
vxorps xmm0, xmm0, xmm0
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000011111100
libpulp_v0_21_5_st_b32s_0000000011111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000001111100
libpulp_v0_21_5_ld_b32s_0000000001111100:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 36]
vpinsrd xmm1, xmm1, [rax + 36 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000001111100
libpulp_v0_21_5_st_b32s_0000000001111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 36], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 36 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000111100
libpulp_v0_21_5_ld_b32s_0000000000111100:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 40]
vpslldq xmm1, xmm1, 8
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000111100
libpulp_v0_21_5_st_b32s_0000000000111100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 40], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000011100
libpulp_v0_21_5_ld_b32s_0000000000011100:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 44]
vpslldq xmm1, xmm1, 12
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000011100
libpulp_v0_21_5_st_b32s_0000000000011100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 12
vmovss [rax + 44], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000001100
libpulp_v0_21_5_ld_b32s_0000000000001100:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 48]
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000001100
libpulp_v0_21_5_st_b32s_0000000000001100:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000000100
libpulp_v0_21_5_ld_b32s_0000000000000100:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 52]
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000000100
libpulp_v0_21_5_st_b32s_0000000000000100:
vextractf64x2 xmm1, zmm0, 0x3
vpsrldq xmm1, xmm1, 4
vmovss [rax + 52], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111111111110
libpulp_v0_21_5_ld_b32s_1111111111111110:
vmovups ymm0, [rax]
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111111111110
libpulp_v0_21_5_st_b32s_1111111111111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vmovups [rax], ymm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111111111110
libpulp_v0_21_5_ld_b32s_0111111111111110:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111111111110
libpulp_v0_21_5_st_b32s_0111111111111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111111111110
libpulp_v0_21_5_ld_b32s_0011111111111110:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111111111110
libpulp_v0_21_5_st_b32s_0011111111111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111111111110
libpulp_v0_21_5_ld_b32s_0001111111111110:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111111111110
libpulp_v0_21_5_st_b32s_0001111111111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111111111110
libpulp_v0_21_5_ld_b32s_0000111111111110:
vxorps xmm0, xmm0, xmm0
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111111111110
libpulp_v0_21_5_st_b32s_0000111111111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011111111110
libpulp_v0_21_5_ld_b32s_0000011111111110:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpinsrd xmm1, xmm1, [rax + 20 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011111111110
libpulp_v0_21_5_st_b32s_0000011111111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 20 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001111111110
libpulp_v0_21_5_ld_b32s_0000001111111110:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001111111110
libpulp_v0_21_5_st_b32s_0000001111111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000111111110
libpulp_v0_21_5_ld_b32s_0000000111111110:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 28]
vpslldq xmm1, xmm1, 12
vinsertf128 ymm0, ymm0, xmm1, 0x1
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000111111110
libpulp_v0_21_5_st_b32s_0000000111111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 12
vmovss [rax + 28], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000011111110
libpulp_v0_21_5_ld_b32s_0000000011111110:
vxorps xmm0, xmm0, xmm0
vmovups xmm1, [rax + 32]
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000011111110
libpulp_v0_21_5_st_b32s_0000000011111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vmovups [rax + 32], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000001111110
libpulp_v0_21_5_ld_b32s_0000000001111110:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 36]
vpinsrd xmm1, xmm1, [rax + 36 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000001111110
libpulp_v0_21_5_st_b32s_0000000001111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 36], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 36 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000111110
libpulp_v0_21_5_ld_b32s_0000000000111110:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 40]
vpslldq xmm1, xmm1, 8
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000111110
libpulp_v0_21_5_st_b32s_0000000000111110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 40], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000011110
libpulp_v0_21_5_ld_b32s_0000000000011110:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 44]
vpslldq xmm1, xmm1, 12
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000011110
libpulp_v0_21_5_st_b32s_0000000000011110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 12
vmovss [rax + 44], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000001110
libpulp_v0_21_5_ld_b32s_0000000000001110:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 48]
vpinsrd xmm1, xmm1, [rax + 48 + 8], 0x2
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000001110
libpulp_v0_21_5_st_b32s_0000000000001110:
vextractf64x2 xmm1, zmm0, 0x3
vmovsd [rax + 48], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 48 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000000110
libpulp_v0_21_5_ld_b32s_0000000000000110:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 52]
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000000110
libpulp_v0_21_5_st_b32s_0000000000000110:
vextractf64x2 xmm1, zmm0, 0x3
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 52], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000000010
libpulp_v0_21_5_ld_b32s_0000000000000010:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 56]
vpslldq xmm1, xmm1, 8
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000000010
libpulp_v0_21_5_st_b32s_0000000000000010:
vextractf64x2 xmm1, zmm0, 0x3
vpsrldq xmm1, xmm1, 8
vmovss [rax + 56], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_1111111111111111
libpulp_v0_21_5_ld_b32s_1111111111111111:
vmovups zmm0, [rax]
jmp rcx
.global libpulp_v0_21_5_st_b32s_1111111111111111
libpulp_v0_21_5_st_b32s_1111111111111111:
vmovups [rax], zmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0111111111111111
libpulp_v0_21_5_ld_b32s_0111111111111111:
vmovsd xmm0, [rax + 4]
vpinsrd xmm0, xmm0, [rax + 4 + 8], 0x2
vpslldq xmm0, xmm0, 4
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vinsertf64x4 zmm0, zmm0, [rax + 32], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0111111111111111
libpulp_v0_21_5_st_b32s_0111111111111111:
vextractf64x4 ymm1, zmm0, 0x1
vmovups [rax + 32], ymm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 4
vmovsd [rax + 4], xmm0
vpsrldq xmm0, xmm0, 8
vmovss [rax + 4 + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0011111111111111
libpulp_v0_21_5_ld_b32s_0011111111111111:
vmovsd xmm0, [rax + 8]
vpslldq xmm0, xmm0, 8
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vinsertf64x4 zmm0, zmm0, [rax + 32], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0011111111111111
libpulp_v0_21_5_st_b32s_0011111111111111:
vextractf64x4 ymm1, zmm0, 0x1
vmovups [rax + 32], ymm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 8
vmovsd [rax + 8], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0001111111111111
libpulp_v0_21_5_ld_b32s_0001111111111111:
vmovss xmm0, [rax + 12]
vpslldq xmm0, xmm0, 12
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vinsertf64x4 zmm0, zmm0, [rax + 32], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0001111111111111
libpulp_v0_21_5_st_b32s_0001111111111111:
vextractf64x4 ymm1, zmm0, 0x1
vmovups [rax + 32], ymm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
vpsrldq xmm0, xmm0, 12
vmovss [rax + 12], xmm0
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000111111111111
libpulp_v0_21_5_ld_b32s_0000111111111111:
vxorps xmm0, xmm0, xmm0
vinsertf128 ymm0, ymm0, [rax + 16], 0x1
vinsertf64x4 zmm0, zmm0, [rax + 32], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000111111111111
libpulp_v0_21_5_st_b32s_0000111111111111:
vextractf64x4 ymm1, zmm0, 0x1
vmovups [rax + 32], ymm1
vextractf128 xmm1, ymm0, 0x1
vmovups [rax + 16], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000011111111111
libpulp_v0_21_5_ld_b32s_0000011111111111:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 20]
vpinsrd xmm1, xmm1, [rax + 20 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf128 ymm0, ymm0, xmm1, 0x1
vinsertf64x4 zmm0, zmm0, [rax + 32], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000011111111111
libpulp_v0_21_5_st_b32s_0000011111111111:
vextractf64x4 ymm1, zmm0, 0x1
vmovups [rax + 32], ymm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 20], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 20 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000001111111111
libpulp_v0_21_5_ld_b32s_0000001111111111:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 24]
vpslldq xmm1, xmm1, 8
vinsertf128 ymm0, ymm0, xmm1, 0x1
vinsertf64x4 zmm0, zmm0, [rax + 32], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000001111111111
libpulp_v0_21_5_st_b32s_0000001111111111:
vextractf64x4 ymm1, zmm0, 0x1
vmovups [rax + 32], ymm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 24], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000111111111
libpulp_v0_21_5_ld_b32s_0000000111111111:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 28]
vpslldq xmm1, xmm1, 12
vinsertf128 ymm0, ymm0, xmm1, 0x1
vinsertf64x4 zmm0, zmm0, [rax + 32], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000111111111
libpulp_v0_21_5_st_b32s_0000000111111111:
vextractf64x4 ymm1, zmm0, 0x1
vmovups [rax + 32], ymm1
vextractf128 xmm1, ymm0, 0x1
vpsrldq xmm1, xmm1, 12
vmovss [rax + 28], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000011111111
libpulp_v0_21_5_ld_b32s_0000000011111111:
vxorps xmm0, xmm0, xmm0
vinsertf64x4 zmm0, zmm0, [rax + 32], 0x1
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000011111111
libpulp_v0_21_5_st_b32s_0000000011111111:
vextractf64x4 ymm1, zmm0, 0x1
vmovups [rax + 32], ymm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000001111111
libpulp_v0_21_5_ld_b32s_0000000001111111:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 36]
vpinsrd xmm1, xmm1, [rax + 36 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vinsertf64x2 zmm0, zmm0, [rax + 48], 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000001111111
libpulp_v0_21_5_st_b32s_0000000001111111:
vextractf64x2 xmm1, zmm0, 0x3
vmovups [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 36], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 36 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000111111
libpulp_v0_21_5_ld_b32s_0000000000111111:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 40]
vpslldq xmm1, xmm1, 8
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vinsertf64x2 zmm0, zmm0, [rax + 48], 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000111111
libpulp_v0_21_5_st_b32s_0000000000111111:
vextractf64x2 xmm1, zmm0, 0x3
vmovups [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 40], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000011111
libpulp_v0_21_5_ld_b32s_0000000000011111:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 44]
vpslldq xmm1, xmm1, 12
vinsertf64x2 zmm0, zmm0, xmm1, 0x2
vinsertf64x2 zmm0, zmm0, [rax + 48], 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000011111
libpulp_v0_21_5_st_b32s_0000000000011111:
vextractf64x2 xmm1, zmm0, 0x3
vmovups [rax + 48], xmm1
vextractf64x2 xmm1, zmm0, 0x2
vpsrldq xmm1, xmm1, 12
vmovss [rax + 44], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000001111
libpulp_v0_21_5_ld_b32s_0000000000001111:
vxorps xmm0, xmm0, xmm0
vinsertf64x2 zmm0, zmm0, [rax + 48], 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000001111
libpulp_v0_21_5_st_b32s_0000000000001111:
vextractf64x2 xmm1, zmm0, 0x3
vmovups [rax + 48], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000000111
libpulp_v0_21_5_ld_b32s_0000000000000111:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 52]
vpinsrd xmm1, xmm1, [rax + 52 + 8], 0x2
vpslldq xmm1, xmm1, 4
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000000111
libpulp_v0_21_5_st_b32s_0000000000000111:
vextractf64x2 xmm1, zmm0, 0x3
vpsrldq xmm1, xmm1, 4
vmovsd [rax + 52], xmm1
vpsrldq xmm1, xmm1, 8
vmovss [rax + 52 + 8], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000000011
libpulp_v0_21_5_ld_b32s_0000000000000011:
vxorps xmm0, xmm0, xmm0
vmovsd xmm1, [rax + 56]
vpslldq xmm1, xmm1, 8
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000000011
libpulp_v0_21_5_st_b32s_0000000000000011:
vextractf64x2 xmm1, zmm0, 0x3
vpsrldq xmm1, xmm1, 8
vmovsd [rax + 56], xmm1
jmp rcx
.global libpulp_v0_21_5_ld_b32s_0000000000000001
libpulp_v0_21_5_ld_b32s_0000000000000001:
vxorps xmm0, xmm0, xmm0
vmovss xmm1, [rax + 60]
vpslldq xmm1, xmm1, 12
vinsertf64x2 zmm0, zmm0, xmm1, 0x3
jmp rcx
.global libpulp_v0_21_5_st_b32s_0000000000000001
libpulp_v0_21_5_st_b32s_0000000000000001:
vextractf64x2 xmm1, zmm0, 0x3
vpsrldq xmm1, xmm1, 12
vmovss [rax + 60], xmm1
jmp rcx
"}
extern "C" {
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1000000000000000"] fn libpulp_v0_21_5_ld_b32s_1000000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1000000000000000"] fn libpulp_v0_21_5_st_b32s_1000000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000000000"] fn libpulp_v0_21_5_ld_b32s_0000000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000000000"] fn libpulp_v0_21_5_st_b32s_0000000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1100000000000000"] fn libpulp_v0_21_5_ld_b32s_1100000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1100000000000000"] fn libpulp_v0_21_5_st_b32s_1100000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0100000000000000"] fn libpulp_v0_21_5_ld_b32s_0100000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0100000000000000"] fn libpulp_v0_21_5_st_b32s_0100000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1110000000000000"] fn libpulp_v0_21_5_ld_b32s_1110000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1110000000000000"] fn libpulp_v0_21_5_st_b32s_1110000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0110000000000000"] fn libpulp_v0_21_5_ld_b32s_0110000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0110000000000000"] fn libpulp_v0_21_5_st_b32s_0110000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0010000000000000"] fn libpulp_v0_21_5_ld_b32s_0010000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0010000000000000"] fn libpulp_v0_21_5_st_b32s_0010000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111000000000000"] fn libpulp_v0_21_5_ld_b32s_1111000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111000000000000"] fn libpulp_v0_21_5_st_b32s_1111000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111000000000000"] fn libpulp_v0_21_5_ld_b32s_0111000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111000000000000"] fn libpulp_v0_21_5_st_b32s_0111000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011000000000000"] fn libpulp_v0_21_5_ld_b32s_0011000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011000000000000"] fn libpulp_v0_21_5_st_b32s_0011000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001000000000000"] fn libpulp_v0_21_5_ld_b32s_0001000000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001000000000000"] fn libpulp_v0_21_5_st_b32s_0001000000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111100000000000"] fn libpulp_v0_21_5_ld_b32s_1111100000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111100000000000"] fn libpulp_v0_21_5_st_b32s_1111100000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111100000000000"] fn libpulp_v0_21_5_ld_b32s_0111100000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111100000000000"] fn libpulp_v0_21_5_st_b32s_0111100000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011100000000000"] fn libpulp_v0_21_5_ld_b32s_0011100000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011100000000000"] fn libpulp_v0_21_5_st_b32s_0011100000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001100000000000"] fn libpulp_v0_21_5_ld_b32s_0001100000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001100000000000"] fn libpulp_v0_21_5_st_b32s_0001100000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000100000000000"] fn libpulp_v0_21_5_ld_b32s_0000100000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000100000000000"] fn libpulp_v0_21_5_st_b32s_0000100000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111110000000000"] fn libpulp_v0_21_5_ld_b32s_1111110000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111110000000000"] fn libpulp_v0_21_5_st_b32s_1111110000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111110000000000"] fn libpulp_v0_21_5_ld_b32s_0111110000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111110000000000"] fn libpulp_v0_21_5_st_b32s_0111110000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011110000000000"] fn libpulp_v0_21_5_ld_b32s_0011110000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011110000000000"] fn libpulp_v0_21_5_st_b32s_0011110000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001110000000000"] fn libpulp_v0_21_5_ld_b32s_0001110000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001110000000000"] fn libpulp_v0_21_5_st_b32s_0001110000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000110000000000"] fn libpulp_v0_21_5_ld_b32s_0000110000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000110000000000"] fn libpulp_v0_21_5_st_b32s_0000110000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000010000000000"] fn libpulp_v0_21_5_ld_b32s_0000010000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000010000000000"] fn libpulp_v0_21_5_st_b32s_0000010000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111000000000"] fn libpulp_v0_21_5_ld_b32s_1111111000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111000000000"] fn libpulp_v0_21_5_st_b32s_1111111000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111000000000"] fn libpulp_v0_21_5_ld_b32s_0111111000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111000000000"] fn libpulp_v0_21_5_st_b32s_0111111000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111000000000"] fn libpulp_v0_21_5_ld_b32s_0011111000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111000000000"] fn libpulp_v0_21_5_st_b32s_0011111000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111000000000"] fn libpulp_v0_21_5_ld_b32s_0001111000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111000000000"] fn libpulp_v0_21_5_st_b32s_0001111000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111000000000"] fn libpulp_v0_21_5_ld_b32s_0000111000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111000000000"] fn libpulp_v0_21_5_st_b32s_0000111000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011000000000"] fn libpulp_v0_21_5_ld_b32s_0000011000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011000000000"] fn libpulp_v0_21_5_st_b32s_0000011000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001000000000"] fn libpulp_v0_21_5_ld_b32s_0000001000000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001000000000"] fn libpulp_v0_21_5_st_b32s_0000001000000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111100000000"] fn libpulp_v0_21_5_ld_b32s_1111111100000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111100000000"] fn libpulp_v0_21_5_st_b32s_1111111100000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111100000000"] fn libpulp_v0_21_5_ld_b32s_0111111100000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111100000000"] fn libpulp_v0_21_5_st_b32s_0111111100000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111100000000"] fn libpulp_v0_21_5_ld_b32s_0011111100000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111100000000"] fn libpulp_v0_21_5_st_b32s_0011111100000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111100000000"] fn libpulp_v0_21_5_ld_b32s_0001111100000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111100000000"] fn libpulp_v0_21_5_st_b32s_0001111100000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111100000000"] fn libpulp_v0_21_5_ld_b32s_0000111100000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111100000000"] fn libpulp_v0_21_5_st_b32s_0000111100000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011100000000"] fn libpulp_v0_21_5_ld_b32s_0000011100000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011100000000"] fn libpulp_v0_21_5_st_b32s_0000011100000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001100000000"] fn libpulp_v0_21_5_ld_b32s_0000001100000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001100000000"] fn libpulp_v0_21_5_st_b32s_0000001100000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000100000000"] fn libpulp_v0_21_5_ld_b32s_0000000100000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000100000000"] fn libpulp_v0_21_5_st_b32s_0000000100000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111110000000"] fn libpulp_v0_21_5_ld_b32s_1111111110000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111110000000"] fn libpulp_v0_21_5_st_b32s_1111111110000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111110000000"] fn libpulp_v0_21_5_ld_b32s_0111111110000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111110000000"] fn libpulp_v0_21_5_st_b32s_0111111110000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111110000000"] fn libpulp_v0_21_5_ld_b32s_0011111110000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111110000000"] fn libpulp_v0_21_5_st_b32s_0011111110000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111110000000"] fn libpulp_v0_21_5_ld_b32s_0001111110000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111110000000"] fn libpulp_v0_21_5_st_b32s_0001111110000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111110000000"] fn libpulp_v0_21_5_ld_b32s_0000111110000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111110000000"] fn libpulp_v0_21_5_st_b32s_0000111110000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011110000000"] fn libpulp_v0_21_5_ld_b32s_0000011110000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011110000000"] fn libpulp_v0_21_5_st_b32s_0000011110000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001110000000"] fn libpulp_v0_21_5_ld_b32s_0000001110000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001110000000"] fn libpulp_v0_21_5_st_b32s_0000001110000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000110000000"] fn libpulp_v0_21_5_ld_b32s_0000000110000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000110000000"] fn libpulp_v0_21_5_st_b32s_0000000110000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000010000000"] fn libpulp_v0_21_5_ld_b32s_0000000010000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000010000000"] fn libpulp_v0_21_5_st_b32s_0000000010000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111111000000"] fn libpulp_v0_21_5_ld_b32s_1111111111000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111111000000"] fn libpulp_v0_21_5_st_b32s_1111111111000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111111000000"] fn libpulp_v0_21_5_ld_b32s_0111111111000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111111000000"] fn libpulp_v0_21_5_st_b32s_0111111111000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111111000000"] fn libpulp_v0_21_5_ld_b32s_0011111111000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111111000000"] fn libpulp_v0_21_5_st_b32s_0011111111000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111111000000"] fn libpulp_v0_21_5_ld_b32s_0001111111000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111111000000"] fn libpulp_v0_21_5_st_b32s_0001111111000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111111000000"] fn libpulp_v0_21_5_ld_b32s_0000111111000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111111000000"] fn libpulp_v0_21_5_st_b32s_0000111111000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011111000000"] fn libpulp_v0_21_5_ld_b32s_0000011111000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011111000000"] fn libpulp_v0_21_5_st_b32s_0000011111000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001111000000"] fn libpulp_v0_21_5_ld_b32s_0000001111000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001111000000"] fn libpulp_v0_21_5_st_b32s_0000001111000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000111000000"] fn libpulp_v0_21_5_ld_b32s_0000000111000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000111000000"] fn libpulp_v0_21_5_st_b32s_0000000111000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000011000000"] fn libpulp_v0_21_5_ld_b32s_0000000011000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000011000000"] fn libpulp_v0_21_5_st_b32s_0000000011000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000001000000"] fn libpulp_v0_21_5_ld_b32s_0000000001000000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000001000000"] fn libpulp_v0_21_5_st_b32s_0000000001000000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111111100000"] fn libpulp_v0_21_5_ld_b32s_1111111111100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111111100000"] fn libpulp_v0_21_5_st_b32s_1111111111100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111111100000"] fn libpulp_v0_21_5_ld_b32s_0111111111100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111111100000"] fn libpulp_v0_21_5_st_b32s_0111111111100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111111100000"] fn libpulp_v0_21_5_ld_b32s_0011111111100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111111100000"] fn libpulp_v0_21_5_st_b32s_0011111111100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111111100000"] fn libpulp_v0_21_5_ld_b32s_0001111111100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111111100000"] fn libpulp_v0_21_5_st_b32s_0001111111100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111111100000"] fn libpulp_v0_21_5_ld_b32s_0000111111100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111111100000"] fn libpulp_v0_21_5_st_b32s_0000111111100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011111100000"] fn libpulp_v0_21_5_ld_b32s_0000011111100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011111100000"] fn libpulp_v0_21_5_st_b32s_0000011111100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001111100000"] fn libpulp_v0_21_5_ld_b32s_0000001111100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001111100000"] fn libpulp_v0_21_5_st_b32s_0000001111100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000111100000"] fn libpulp_v0_21_5_ld_b32s_0000000111100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000111100000"] fn libpulp_v0_21_5_st_b32s_0000000111100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000011100000"] fn libpulp_v0_21_5_ld_b32s_0000000011100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000011100000"] fn libpulp_v0_21_5_st_b32s_0000000011100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000001100000"] fn libpulp_v0_21_5_ld_b32s_0000000001100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000001100000"] fn libpulp_v0_21_5_st_b32s_0000000001100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000100000"] fn libpulp_v0_21_5_ld_b32s_0000000000100000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000100000"] fn libpulp_v0_21_5_st_b32s_0000000000100000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111111110000"] fn libpulp_v0_21_5_ld_b32s_1111111111110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111111110000"] fn libpulp_v0_21_5_st_b32s_1111111111110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111111110000"] fn libpulp_v0_21_5_ld_b32s_0111111111110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111111110000"] fn libpulp_v0_21_5_st_b32s_0111111111110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111111110000"] fn libpulp_v0_21_5_ld_b32s_0011111111110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111111110000"] fn libpulp_v0_21_5_st_b32s_0011111111110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111111110000"] fn libpulp_v0_21_5_ld_b32s_0001111111110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111111110000"] fn libpulp_v0_21_5_st_b32s_0001111111110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111111110000"] fn libpulp_v0_21_5_ld_b32s_0000111111110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111111110000"] fn libpulp_v0_21_5_st_b32s_0000111111110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011111110000"] fn libpulp_v0_21_5_ld_b32s_0000011111110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011111110000"] fn libpulp_v0_21_5_st_b32s_0000011111110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001111110000"] fn libpulp_v0_21_5_ld_b32s_0000001111110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001111110000"] fn libpulp_v0_21_5_st_b32s_0000001111110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000111110000"] fn libpulp_v0_21_5_ld_b32s_0000000111110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000111110000"] fn libpulp_v0_21_5_st_b32s_0000000111110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000011110000"] fn libpulp_v0_21_5_ld_b32s_0000000011110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000011110000"] fn libpulp_v0_21_5_st_b32s_0000000011110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000001110000"] fn libpulp_v0_21_5_ld_b32s_0000000001110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000001110000"] fn libpulp_v0_21_5_st_b32s_0000000001110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000110000"] fn libpulp_v0_21_5_ld_b32s_0000000000110000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000110000"] fn libpulp_v0_21_5_st_b32s_0000000000110000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000010000"] fn libpulp_v0_21_5_ld_b32s_0000000000010000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000010000"] fn libpulp_v0_21_5_st_b32s_0000000000010000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111111111000"] fn libpulp_v0_21_5_ld_b32s_1111111111111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111111111000"] fn libpulp_v0_21_5_st_b32s_1111111111111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111111111000"] fn libpulp_v0_21_5_ld_b32s_0111111111111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111111111000"] fn libpulp_v0_21_5_st_b32s_0111111111111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111111111000"] fn libpulp_v0_21_5_ld_b32s_0011111111111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111111111000"] fn libpulp_v0_21_5_st_b32s_0011111111111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111111111000"] fn libpulp_v0_21_5_ld_b32s_0001111111111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111111111000"] fn libpulp_v0_21_5_st_b32s_0001111111111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111111111000"] fn libpulp_v0_21_5_ld_b32s_0000111111111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111111111000"] fn libpulp_v0_21_5_st_b32s_0000111111111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011111111000"] fn libpulp_v0_21_5_ld_b32s_0000011111111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011111111000"] fn libpulp_v0_21_5_st_b32s_0000011111111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001111111000"] fn libpulp_v0_21_5_ld_b32s_0000001111111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001111111000"] fn libpulp_v0_21_5_st_b32s_0000001111111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000111111000"] fn libpulp_v0_21_5_ld_b32s_0000000111111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000111111000"] fn libpulp_v0_21_5_st_b32s_0000000111111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000011111000"] fn libpulp_v0_21_5_ld_b32s_0000000011111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000011111000"] fn libpulp_v0_21_5_st_b32s_0000000011111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000001111000"] fn libpulp_v0_21_5_ld_b32s_0000000001111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000001111000"] fn libpulp_v0_21_5_st_b32s_0000000001111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000111000"] fn libpulp_v0_21_5_ld_b32s_0000000000111000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000111000"] fn libpulp_v0_21_5_st_b32s_0000000000111000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000011000"] fn libpulp_v0_21_5_ld_b32s_0000000000011000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000011000"] fn libpulp_v0_21_5_st_b32s_0000000000011000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000001000"] fn libpulp_v0_21_5_ld_b32s_0000000000001000();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000001000"] fn libpulp_v0_21_5_st_b32s_0000000000001000();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111111111100"] fn libpulp_v0_21_5_ld_b32s_1111111111111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111111111100"] fn libpulp_v0_21_5_st_b32s_1111111111111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111111111100"] fn libpulp_v0_21_5_ld_b32s_0111111111111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111111111100"] fn libpulp_v0_21_5_st_b32s_0111111111111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111111111100"] fn libpulp_v0_21_5_ld_b32s_0011111111111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111111111100"] fn libpulp_v0_21_5_st_b32s_0011111111111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111111111100"] fn libpulp_v0_21_5_ld_b32s_0001111111111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111111111100"] fn libpulp_v0_21_5_st_b32s_0001111111111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111111111100"] fn libpulp_v0_21_5_ld_b32s_0000111111111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111111111100"] fn libpulp_v0_21_5_st_b32s_0000111111111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011111111100"] fn libpulp_v0_21_5_ld_b32s_0000011111111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011111111100"] fn libpulp_v0_21_5_st_b32s_0000011111111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001111111100"] fn libpulp_v0_21_5_ld_b32s_0000001111111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001111111100"] fn libpulp_v0_21_5_st_b32s_0000001111111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000111111100"] fn libpulp_v0_21_5_ld_b32s_0000000111111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000111111100"] fn libpulp_v0_21_5_st_b32s_0000000111111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000011111100"] fn libpulp_v0_21_5_ld_b32s_0000000011111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000011111100"] fn libpulp_v0_21_5_st_b32s_0000000011111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000001111100"] fn libpulp_v0_21_5_ld_b32s_0000000001111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000001111100"] fn libpulp_v0_21_5_st_b32s_0000000001111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000111100"] fn libpulp_v0_21_5_ld_b32s_0000000000111100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000111100"] fn libpulp_v0_21_5_st_b32s_0000000000111100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000011100"] fn libpulp_v0_21_5_ld_b32s_0000000000011100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000011100"] fn libpulp_v0_21_5_st_b32s_0000000000011100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000001100"] fn libpulp_v0_21_5_ld_b32s_0000000000001100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000001100"] fn libpulp_v0_21_5_st_b32s_0000000000001100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000000100"] fn libpulp_v0_21_5_ld_b32s_0000000000000100();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000000100"] fn libpulp_v0_21_5_st_b32s_0000000000000100();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111111111110"] fn libpulp_v0_21_5_ld_b32s_1111111111111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111111111110"] fn libpulp_v0_21_5_st_b32s_1111111111111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111111111110"] fn libpulp_v0_21_5_ld_b32s_0111111111111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111111111110"] fn libpulp_v0_21_5_st_b32s_0111111111111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111111111110"] fn libpulp_v0_21_5_ld_b32s_0011111111111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111111111110"] fn libpulp_v0_21_5_st_b32s_0011111111111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111111111110"] fn libpulp_v0_21_5_ld_b32s_0001111111111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111111111110"] fn libpulp_v0_21_5_st_b32s_0001111111111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111111111110"] fn libpulp_v0_21_5_ld_b32s_0000111111111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111111111110"] fn libpulp_v0_21_5_st_b32s_0000111111111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011111111110"] fn libpulp_v0_21_5_ld_b32s_0000011111111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011111111110"] fn libpulp_v0_21_5_st_b32s_0000011111111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001111111110"] fn libpulp_v0_21_5_ld_b32s_0000001111111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001111111110"] fn libpulp_v0_21_5_st_b32s_0000001111111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000111111110"] fn libpulp_v0_21_5_ld_b32s_0000000111111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000111111110"] fn libpulp_v0_21_5_st_b32s_0000000111111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000011111110"] fn libpulp_v0_21_5_ld_b32s_0000000011111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000011111110"] fn libpulp_v0_21_5_st_b32s_0000000011111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000001111110"] fn libpulp_v0_21_5_ld_b32s_0000000001111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000001111110"] fn libpulp_v0_21_5_st_b32s_0000000001111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000111110"] fn libpulp_v0_21_5_ld_b32s_0000000000111110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000111110"] fn libpulp_v0_21_5_st_b32s_0000000000111110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000011110"] fn libpulp_v0_21_5_ld_b32s_0000000000011110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000011110"] fn libpulp_v0_21_5_st_b32s_0000000000011110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000001110"] fn libpulp_v0_21_5_ld_b32s_0000000000001110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000001110"] fn libpulp_v0_21_5_st_b32s_0000000000001110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000000110"] fn libpulp_v0_21_5_ld_b32s_0000000000000110();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000000110"] fn libpulp_v0_21_5_st_b32s_0000000000000110();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000000010"] fn libpulp_v0_21_5_ld_b32s_0000000000000010();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000000010"] fn libpulp_v0_21_5_st_b32s_0000000000000010();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_1111111111111111"] fn libpulp_v0_21_5_ld_b32s_1111111111111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_1111111111111111"] fn libpulp_v0_21_5_st_b32s_1111111111111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0111111111111111"] fn libpulp_v0_21_5_ld_b32s_0111111111111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0111111111111111"] fn libpulp_v0_21_5_st_b32s_0111111111111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0011111111111111"] fn libpulp_v0_21_5_ld_b32s_0011111111111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0011111111111111"] fn libpulp_v0_21_5_st_b32s_0011111111111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0001111111111111"] fn libpulp_v0_21_5_ld_b32s_0001111111111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0001111111111111"] fn libpulp_v0_21_5_st_b32s_0001111111111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000111111111111"] fn libpulp_v0_21_5_ld_b32s_0000111111111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000111111111111"] fn libpulp_v0_21_5_st_b32s_0000111111111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000011111111111"] fn libpulp_v0_21_5_ld_b32s_0000011111111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000011111111111"] fn libpulp_v0_21_5_st_b32s_0000011111111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000001111111111"] fn libpulp_v0_21_5_ld_b32s_0000001111111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000001111111111"] fn libpulp_v0_21_5_st_b32s_0000001111111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000111111111"] fn libpulp_v0_21_5_ld_b32s_0000000111111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000111111111"] fn libpulp_v0_21_5_st_b32s_0000000111111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000011111111"] fn libpulp_v0_21_5_ld_b32s_0000000011111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000011111111"] fn libpulp_v0_21_5_st_b32s_0000000011111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000001111111"] fn libpulp_v0_21_5_ld_b32s_0000000001111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000001111111"] fn libpulp_v0_21_5_st_b32s_0000000001111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000111111"] fn libpulp_v0_21_5_ld_b32s_0000000000111111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000111111"] fn libpulp_v0_21_5_st_b32s_0000000000111111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000011111"] fn libpulp_v0_21_5_ld_b32s_0000000000011111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000011111"] fn libpulp_v0_21_5_st_b32s_0000000000011111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000001111"] fn libpulp_v0_21_5_ld_b32s_0000000000001111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000001111"] fn libpulp_v0_21_5_st_b32s_0000000000001111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000000111"] fn libpulp_v0_21_5_ld_b32s_0000000000000111();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000000111"] fn libpulp_v0_21_5_st_b32s_0000000000000111();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000000011"] fn libpulp_v0_21_5_ld_b32s_0000000000000011();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000000011"] fn libpulp_v0_21_5_st_b32s_0000000000000011();
#[link_name = "\x01libpulp_v0_21_5_ld_b32s_0000000000000001"] fn libpulp_v0_21_5_ld_b32s_0000000000000001();
#[link_name = "\x01libpulp_v0_21_5_st_b32s_0000000000000001"] fn libpulp_v0_21_5_st_b32s_0000000000000001();
}
static LD_ST: [unsafe extern "C" fn(); 2 * ((16 + 1) * 16)] = [
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1000000000000000, libpulp_v0_21_5_st_b32s_1000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1100000000000000, libpulp_v0_21_5_st_b32s_1100000000000000,
libpulp_v0_21_5_ld_b32s_0100000000000000, libpulp_v0_21_5_st_b32s_0100000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1110000000000000, libpulp_v0_21_5_st_b32s_1110000000000000,
libpulp_v0_21_5_ld_b32s_0110000000000000, libpulp_v0_21_5_st_b32s_0110000000000000,
libpulp_v0_21_5_ld_b32s_0010000000000000, libpulp_v0_21_5_st_b32s_0010000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111000000000000, libpulp_v0_21_5_st_b32s_1111000000000000,
libpulp_v0_21_5_ld_b32s_0111000000000000, libpulp_v0_21_5_st_b32s_0111000000000000,
libpulp_v0_21_5_ld_b32s_0011000000000000, libpulp_v0_21_5_st_b32s_0011000000000000,
libpulp_v0_21_5_ld_b32s_0001000000000000, libpulp_v0_21_5_st_b32s_0001000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111100000000000, libpulp_v0_21_5_st_b32s_1111100000000000,
libpulp_v0_21_5_ld_b32s_0111100000000000, libpulp_v0_21_5_st_b32s_0111100000000000,
libpulp_v0_21_5_ld_b32s_0011100000000000, libpulp_v0_21_5_st_b32s_0011100000000000,
libpulp_v0_21_5_ld_b32s_0001100000000000, libpulp_v0_21_5_st_b32s_0001100000000000,
libpulp_v0_21_5_ld_b32s_0000100000000000, libpulp_v0_21_5_st_b32s_0000100000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111110000000000, libpulp_v0_21_5_st_b32s_1111110000000000,
libpulp_v0_21_5_ld_b32s_0111110000000000, libpulp_v0_21_5_st_b32s_0111110000000000,
libpulp_v0_21_5_ld_b32s_0011110000000000, libpulp_v0_21_5_st_b32s_0011110000000000,
libpulp_v0_21_5_ld_b32s_0001110000000000, libpulp_v0_21_5_st_b32s_0001110000000000,
libpulp_v0_21_5_ld_b32s_0000110000000000, libpulp_v0_21_5_st_b32s_0000110000000000,
libpulp_v0_21_5_ld_b32s_0000010000000000, libpulp_v0_21_5_st_b32s_0000010000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111000000000, libpulp_v0_21_5_st_b32s_1111111000000000,
libpulp_v0_21_5_ld_b32s_0111111000000000, libpulp_v0_21_5_st_b32s_0111111000000000,
libpulp_v0_21_5_ld_b32s_0011111000000000, libpulp_v0_21_5_st_b32s_0011111000000000,
libpulp_v0_21_5_ld_b32s_0001111000000000, libpulp_v0_21_5_st_b32s_0001111000000000,
libpulp_v0_21_5_ld_b32s_0000111000000000, libpulp_v0_21_5_st_b32s_0000111000000000,
libpulp_v0_21_5_ld_b32s_0000011000000000, libpulp_v0_21_5_st_b32s_0000011000000000,
libpulp_v0_21_5_ld_b32s_0000001000000000, libpulp_v0_21_5_st_b32s_0000001000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111100000000, libpulp_v0_21_5_st_b32s_1111111100000000,
libpulp_v0_21_5_ld_b32s_0111111100000000, libpulp_v0_21_5_st_b32s_0111111100000000,
libpulp_v0_21_5_ld_b32s_0011111100000000, libpulp_v0_21_5_st_b32s_0011111100000000,
libpulp_v0_21_5_ld_b32s_0001111100000000, libpulp_v0_21_5_st_b32s_0001111100000000,
libpulp_v0_21_5_ld_b32s_0000111100000000, libpulp_v0_21_5_st_b32s_0000111100000000,
libpulp_v0_21_5_ld_b32s_0000011100000000, libpulp_v0_21_5_st_b32s_0000011100000000,
libpulp_v0_21_5_ld_b32s_0000001100000000, libpulp_v0_21_5_st_b32s_0000001100000000,
libpulp_v0_21_5_ld_b32s_0000000100000000, libpulp_v0_21_5_st_b32s_0000000100000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111110000000, libpulp_v0_21_5_st_b32s_1111111110000000,
libpulp_v0_21_5_ld_b32s_0111111110000000, libpulp_v0_21_5_st_b32s_0111111110000000,
libpulp_v0_21_5_ld_b32s_0011111110000000, libpulp_v0_21_5_st_b32s_0011111110000000,
libpulp_v0_21_5_ld_b32s_0001111110000000, libpulp_v0_21_5_st_b32s_0001111110000000,
libpulp_v0_21_5_ld_b32s_0000111110000000, libpulp_v0_21_5_st_b32s_0000111110000000,
libpulp_v0_21_5_ld_b32s_0000011110000000, libpulp_v0_21_5_st_b32s_0000011110000000,
libpulp_v0_21_5_ld_b32s_0000001110000000, libpulp_v0_21_5_st_b32s_0000001110000000,
libpulp_v0_21_5_ld_b32s_0000000110000000, libpulp_v0_21_5_st_b32s_0000000110000000,
libpulp_v0_21_5_ld_b32s_0000000010000000, libpulp_v0_21_5_st_b32s_0000000010000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111111000000, libpulp_v0_21_5_st_b32s_1111111111000000,
libpulp_v0_21_5_ld_b32s_0111111111000000, libpulp_v0_21_5_st_b32s_0111111111000000,
libpulp_v0_21_5_ld_b32s_0011111111000000, libpulp_v0_21_5_st_b32s_0011111111000000,
libpulp_v0_21_5_ld_b32s_0001111111000000, libpulp_v0_21_5_st_b32s_0001111111000000,
libpulp_v0_21_5_ld_b32s_0000111111000000, libpulp_v0_21_5_st_b32s_0000111111000000,
libpulp_v0_21_5_ld_b32s_0000011111000000, libpulp_v0_21_5_st_b32s_0000011111000000,
libpulp_v0_21_5_ld_b32s_0000001111000000, libpulp_v0_21_5_st_b32s_0000001111000000,
libpulp_v0_21_5_ld_b32s_0000000111000000, libpulp_v0_21_5_st_b32s_0000000111000000,
libpulp_v0_21_5_ld_b32s_0000000011000000, libpulp_v0_21_5_st_b32s_0000000011000000,
libpulp_v0_21_5_ld_b32s_0000000001000000, libpulp_v0_21_5_st_b32s_0000000001000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111111100000, libpulp_v0_21_5_st_b32s_1111111111100000,
libpulp_v0_21_5_ld_b32s_0111111111100000, libpulp_v0_21_5_st_b32s_0111111111100000,
libpulp_v0_21_5_ld_b32s_0011111111100000, libpulp_v0_21_5_st_b32s_0011111111100000,
libpulp_v0_21_5_ld_b32s_0001111111100000, libpulp_v0_21_5_st_b32s_0001111111100000,
libpulp_v0_21_5_ld_b32s_0000111111100000, libpulp_v0_21_5_st_b32s_0000111111100000,
libpulp_v0_21_5_ld_b32s_0000011111100000, libpulp_v0_21_5_st_b32s_0000011111100000,
libpulp_v0_21_5_ld_b32s_0000001111100000, libpulp_v0_21_5_st_b32s_0000001111100000,
libpulp_v0_21_5_ld_b32s_0000000111100000, libpulp_v0_21_5_st_b32s_0000000111100000,
libpulp_v0_21_5_ld_b32s_0000000011100000, libpulp_v0_21_5_st_b32s_0000000011100000,
libpulp_v0_21_5_ld_b32s_0000000001100000, libpulp_v0_21_5_st_b32s_0000000001100000,
libpulp_v0_21_5_ld_b32s_0000000000100000, libpulp_v0_21_5_st_b32s_0000000000100000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111111110000, libpulp_v0_21_5_st_b32s_1111111111110000,
libpulp_v0_21_5_ld_b32s_0111111111110000, libpulp_v0_21_5_st_b32s_0111111111110000,
libpulp_v0_21_5_ld_b32s_0011111111110000, libpulp_v0_21_5_st_b32s_0011111111110000,
libpulp_v0_21_5_ld_b32s_0001111111110000, libpulp_v0_21_5_st_b32s_0001111111110000,
libpulp_v0_21_5_ld_b32s_0000111111110000, libpulp_v0_21_5_st_b32s_0000111111110000,
libpulp_v0_21_5_ld_b32s_0000011111110000, libpulp_v0_21_5_st_b32s_0000011111110000,
libpulp_v0_21_5_ld_b32s_0000001111110000, libpulp_v0_21_5_st_b32s_0000001111110000,
libpulp_v0_21_5_ld_b32s_0000000111110000, libpulp_v0_21_5_st_b32s_0000000111110000,
libpulp_v0_21_5_ld_b32s_0000000011110000, libpulp_v0_21_5_st_b32s_0000000011110000,
libpulp_v0_21_5_ld_b32s_0000000001110000, libpulp_v0_21_5_st_b32s_0000000001110000,
libpulp_v0_21_5_ld_b32s_0000000000110000, libpulp_v0_21_5_st_b32s_0000000000110000,
libpulp_v0_21_5_ld_b32s_0000000000010000, libpulp_v0_21_5_st_b32s_0000000000010000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111111111000, libpulp_v0_21_5_st_b32s_1111111111111000,
libpulp_v0_21_5_ld_b32s_0111111111111000, libpulp_v0_21_5_st_b32s_0111111111111000,
libpulp_v0_21_5_ld_b32s_0011111111111000, libpulp_v0_21_5_st_b32s_0011111111111000,
libpulp_v0_21_5_ld_b32s_0001111111111000, libpulp_v0_21_5_st_b32s_0001111111111000,
libpulp_v0_21_5_ld_b32s_0000111111111000, libpulp_v0_21_5_st_b32s_0000111111111000,
libpulp_v0_21_5_ld_b32s_0000011111111000, libpulp_v0_21_5_st_b32s_0000011111111000,
libpulp_v0_21_5_ld_b32s_0000001111111000, libpulp_v0_21_5_st_b32s_0000001111111000,
libpulp_v0_21_5_ld_b32s_0000000111111000, libpulp_v0_21_5_st_b32s_0000000111111000,
libpulp_v0_21_5_ld_b32s_0000000011111000, libpulp_v0_21_5_st_b32s_0000000011111000,
libpulp_v0_21_5_ld_b32s_0000000001111000, libpulp_v0_21_5_st_b32s_0000000001111000,
libpulp_v0_21_5_ld_b32s_0000000000111000, libpulp_v0_21_5_st_b32s_0000000000111000,
libpulp_v0_21_5_ld_b32s_0000000000011000, libpulp_v0_21_5_st_b32s_0000000000011000,
libpulp_v0_21_5_ld_b32s_0000000000001000, libpulp_v0_21_5_st_b32s_0000000000001000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111111111100, libpulp_v0_21_5_st_b32s_1111111111111100,
libpulp_v0_21_5_ld_b32s_0111111111111100, libpulp_v0_21_5_st_b32s_0111111111111100,
libpulp_v0_21_5_ld_b32s_0011111111111100, libpulp_v0_21_5_st_b32s_0011111111111100,
libpulp_v0_21_5_ld_b32s_0001111111111100, libpulp_v0_21_5_st_b32s_0001111111111100,
libpulp_v0_21_5_ld_b32s_0000111111111100, libpulp_v0_21_5_st_b32s_0000111111111100,
libpulp_v0_21_5_ld_b32s_0000011111111100, libpulp_v0_21_5_st_b32s_0000011111111100,
libpulp_v0_21_5_ld_b32s_0000001111111100, libpulp_v0_21_5_st_b32s_0000001111111100,
libpulp_v0_21_5_ld_b32s_0000000111111100, libpulp_v0_21_5_st_b32s_0000000111111100,
libpulp_v0_21_5_ld_b32s_0000000011111100, libpulp_v0_21_5_st_b32s_0000000011111100,
libpulp_v0_21_5_ld_b32s_0000000001111100, libpulp_v0_21_5_st_b32s_0000000001111100,
libpulp_v0_21_5_ld_b32s_0000000000111100, libpulp_v0_21_5_st_b32s_0000000000111100,
libpulp_v0_21_5_ld_b32s_0000000000011100, libpulp_v0_21_5_st_b32s_0000000000011100,
libpulp_v0_21_5_ld_b32s_0000000000001100, libpulp_v0_21_5_st_b32s_0000000000001100,
libpulp_v0_21_5_ld_b32s_0000000000000100, libpulp_v0_21_5_st_b32s_0000000000000100,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111111111110, libpulp_v0_21_5_st_b32s_1111111111111110,
libpulp_v0_21_5_ld_b32s_0111111111111110, libpulp_v0_21_5_st_b32s_0111111111111110,
libpulp_v0_21_5_ld_b32s_0011111111111110, libpulp_v0_21_5_st_b32s_0011111111111110,
libpulp_v0_21_5_ld_b32s_0001111111111110, libpulp_v0_21_5_st_b32s_0001111111111110,
libpulp_v0_21_5_ld_b32s_0000111111111110, libpulp_v0_21_5_st_b32s_0000111111111110,
libpulp_v0_21_5_ld_b32s_0000011111111110, libpulp_v0_21_5_st_b32s_0000011111111110,
libpulp_v0_21_5_ld_b32s_0000001111111110, libpulp_v0_21_5_st_b32s_0000001111111110,
libpulp_v0_21_5_ld_b32s_0000000111111110, libpulp_v0_21_5_st_b32s_0000000111111110,
libpulp_v0_21_5_ld_b32s_0000000011111110, libpulp_v0_21_5_st_b32s_0000000011111110,
libpulp_v0_21_5_ld_b32s_0000000001111110, libpulp_v0_21_5_st_b32s_0000000001111110,
libpulp_v0_21_5_ld_b32s_0000000000111110, libpulp_v0_21_5_st_b32s_0000000000111110,
libpulp_v0_21_5_ld_b32s_0000000000011110, libpulp_v0_21_5_st_b32s_0000000000011110,
libpulp_v0_21_5_ld_b32s_0000000000001110, libpulp_v0_21_5_st_b32s_0000000000001110,
libpulp_v0_21_5_ld_b32s_0000000000000110, libpulp_v0_21_5_st_b32s_0000000000000110,
libpulp_v0_21_5_ld_b32s_0000000000000010, libpulp_v0_21_5_st_b32s_0000000000000010,
libpulp_v0_21_5_ld_b32s_0000000000000000, libpulp_v0_21_5_st_b32s_0000000000000000,
libpulp_v0_21_5_ld_b32s_1111111111111111, libpulp_v0_21_5_st_b32s_1111111111111111,
libpulp_v0_21_5_ld_b32s_0111111111111111, libpulp_v0_21_5_st_b32s_0111111111111111,
libpulp_v0_21_5_ld_b32s_0011111111111111, libpulp_v0_21_5_st_b32s_0011111111111111,
libpulp_v0_21_5_ld_b32s_0001111111111111, libpulp_v0_21_5_st_b32s_0001111111111111,
libpulp_v0_21_5_ld_b32s_0000111111111111, libpulp_v0_21_5_st_b32s_0000111111111111,
libpulp_v0_21_5_ld_b32s_0000011111111111, libpulp_v0_21_5_st_b32s_0000011111111111,
libpulp_v0_21_5_ld_b32s_0000001111111111, libpulp_v0_21_5_st_b32s_0000001111111111,
libpulp_v0_21_5_ld_b32s_0000000111111111, libpulp_v0_21_5_st_b32s_0000000111111111,
libpulp_v0_21_5_ld_b32s_0000000011111111, libpulp_v0_21_5_st_b32s_0000000011111111,
libpulp_v0_21_5_ld_b32s_0000000001111111, libpulp_v0_21_5_st_b32s_0000000001111111,
libpulp_v0_21_5_ld_b32s_0000000000111111, libpulp_v0_21_5_st_b32s_0000000000111111,
libpulp_v0_21_5_ld_b32s_0000000000011111, libpulp_v0_21_5_st_b32s_0000000000011111,
libpulp_v0_21_5_ld_b32s_0000000000001111, libpulp_v0_21_5_st_b32s_0000000000001111,
libpulp_v0_21_5_ld_b32s_0000000000000111, libpulp_v0_21_5_st_b32s_0000000000000111,
libpulp_v0_21_5_ld_b32s_0000000000000011, libpulp_v0_21_5_st_b32s_0000000000000011,
libpulp_v0_21_5_ld_b32s_0000000000000001, libpulp_v0_21_5_st_b32s_0000000000000001,
];
